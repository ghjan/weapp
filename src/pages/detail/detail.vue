<template>
  <div class="book-detail">
    <bookinfo :info="info"></bookinfo>
    <commentlist :commentslist="comments" v-if="comments.length"></commentlist>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment" class="textcomment" maxlength="100" placeholder="请输入短评"></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">
        评论
      </button>
    </div>
    <div v-else class="text-footer">未登录或已评论过</div>
    <button class="btn" open-type="share">分享</button>
  </div>
</template>
<script>
import {get, post, showModal} from '@/util'
import bookinfo from '@/components/bookinfo'
import commentlist from '@/components/commentlist'
export default {
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      comments: []
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '图书分享',
      path: `/pages/detail/main?id=${this.bookid}`
    }
  },
  methods: {
    async getBookDetail () {
      let res = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: res.title
      })
      this.info = res
    },
    getGeo (e) {
      const ak = 'rwyHgy3Va7EmEE5iOsHPokxKU9ALBZnK'
      const url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: (res) => {
            wx.request({
              url,
              data: {
                location: `${res.latitude}, ${res.longitude}`,
                ak: ak,
                output: 'json'
              },
              success: (res) => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = ''
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        let phoneinfo = wx.getSystemInfoSync()
        this.phone = phoneinfo.model
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      let obj = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        location: this.location,
        phone: this.phone
      }
      if (this.comment) {
        try {
          await post('/weapp/addcomment', obj)
          this.comment = ''
          this.getCommentsList()
        } catch (e) {
          showModal('失败', e.msg)
        }
      } else {
        return false
      }
    },
    async getCommentsList () {
      let res = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = res.list
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getBookDetail()
    this.getCommentsList()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  components: {
    bookinfo,
    commentlist
  },
  computed: {
    showAdd () {
      // 未登录
      if (!this.userinfo.openid) {
        return false
      }
      // 已评论过
      if (this.comments.filter((item) =>
        item.openid === this.userinfo.openId
      ).length) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss">
.book-detail{
  .comment{
    margin-top: 10px;
    .textcomment{
      width: 730rpx;
      height: 220rpx;
      background: #eee;
      padding: 10rpx;
    }
    .location{
      margin-top: 10px;
      padding: 5px 10px
    }
    .phone{
      margin-top: 10px;
      padding: 5px 10px;
    }
  }
}
</style>

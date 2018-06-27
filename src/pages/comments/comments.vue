<template>
  <div class="comment-container">
    <commentlist v-if="userinfo.openId" type="user" :commentslist="comments"></commentlist>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <card v-for="book in books" :key="book.id" :book="book"></card>
      <div v-if="!books.length" class="nobook-info">没有图书,去添加吧</div>
    </div>
  </div>
</template>
<script>
import {get} from '@/util'
import commentlist from '@/components/commentlist'
import card from '@/components/card'
export default {
  data () {
    return {
      userinfo: {},
      comments: [],
      books: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getCommentList()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getCommentList () {
      let res = await get('/weapp/commentlist', {openid: this.userinfo.openId})
      this.comments = res.list
    },
    async getBooks () {
      let res = await get('/weapp/booklist', {openid: this.userinfo.openId})
      this.books = res.list
      console.log(res)
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.opendId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      } else {

      }
    } else {

    }
  },
  components: {
    commentlist,
    card
  }
}
</script>
<style lang="scss">
.comment-container{
  .nobook-info{
    font-size: 14px;
    color: #ccc;
    text-align: center;
    margin-top: 50px;
  }
}
</style>

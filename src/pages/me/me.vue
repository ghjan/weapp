<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <year-progress></year-progress>
    <button v-if="userinfo.openId" class="btn" @click="scanBook">添加图书</button>
  </div>
</template>
<script>
import yearProgress from '@/components/yearprogress.vue'
import {showSuccess, showModal, post} from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
export default {
  data () {
    return {
      userinfo: {
        avatarUrl: '../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  onShow () {
    if (wx.getStorageSync('userinfo')) {
      this.userinfo = wx.getStorageSync('userinfo')
    }
  },
  methods: {
    async addBook (isbn) {
      let res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      console.log(res)
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    login () {
      // 设置登录地址
      let userinfo = wx.getStorageSync('userinfo')
      if (!userinfo) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: (userInfo) => {
            qcloud.request({
              url: config.userUrl,
              login: true,
              success: (res) => {
                console.log(res)
                showSuccess('登录成功')
                this.userinfo = res.data.data
                wx.setStorageSync('userinfo', res.data.data)
              }
            })
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      } else {

      }
    }
  },
  components: {
    yearProgress
  }
}
</script>
<style lang="scss">
.container{
  padding: 0 30rpx;
}
.userinfo{
  margin-top: 100rpx;
  text-align: center;
  img{
    margin: 20rpx;
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
}
</style>

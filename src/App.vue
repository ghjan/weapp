<script>
import {showSuccess} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  async created () {
    // 设置登录地址
    let userinfo = wx.getStorageSync('userinfo')
    if (!userinfo) {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          console.log('登录成功', userInfo)
          showSuccess('登录成功')
          wx.setStorageSync('userinfo', userInfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    } else {

    }
    // let res = await get('/weapp/demo')
    // console.log(res)
  }
}
</script>

<style lang="scss">
.btn{
  color: white;
  background-color: #EA5149;
  font-size: 16px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>

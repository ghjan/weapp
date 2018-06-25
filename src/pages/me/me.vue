<template>
  <div class="contaienr">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <year-progress></year-progress>
    <button class="btn">添加图书</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    this.userinfo = wx.getStorageSync('userinfo')
  },
  methods: {

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
      width: 128rpx;
      height: 128rpx;
      border-radius: 50%;
    }
  }
</style>

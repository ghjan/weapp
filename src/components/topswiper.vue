<template>
  <div class="swiper">
    <swiper :indicator-dots="true"
            indicator-color="#EA5149"
            :autoplay="true"
            :interval="6000"
            :duration="1000"
            :circular="true">
      <div v-for="(top, i) in imageUrl" :key="i">
        <swiper-item>
          <img @click="bookdetail(image)" v-for="(image, t) in top" :key="t" :src="image.image" mode="aspectFit" class="slider_image">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Array,
      default: []
    }
  },
  methods: {
    bookdetail (image) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${image.id}`
      })
    }
  },
  computed: {
    imageUrl () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)]
    }
  }
}
</script>

<style lang="scss">
.swiper{
  margin-top: 5px;
  .slider_image{
    width: 33%;
    height: 250rpx;

  }
}
</style>

<template>
<a :href="detailUrl">
  <div class="book-card">
    <div class="thumb" @click.stop="preview">
      <img :src="book.image" class="thumb_img" mode="aspectFit" />
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="left">
          {{book.title}}
        </div>
        <div class="right">
          {{book.rate}} <rate :rate="book.rate"></rate>
        </div>
      </div>
      <div class="row">
        <div class="left">

          {{book.author}}
        </div>
        <div class="right text-primary mw">
         浏览量{{book.count}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          {{book.publisher}}
        </div>
        <div class="right">
          {{book.user_info.nickName}}
        </div>
      </div>
    </div>
  </div>
</a>

</template>

<script>
import rate from '@/components/rate'
export default {
  props: {
    book: {
      type: JSON,
      default: {}
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image, // 当前显示图片的链接，不填则默认为 urls 的第一张
        urls: [this.book.image]
      })
    }
  },
  components: {
    rate
  },
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.book.id}`
    }
  }

}
</script>

<style lang="scss">
.book-card{
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  .thumb{
    height: 90px;
    width: 90px;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    &_img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail{
    margin-left: 100px;
    .row{
      line-height: 20px;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      .right{
        &.mw{
          min-width: 70px;
          text-align: right;
        }
      }
    }

  }
}
</style>

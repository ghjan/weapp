<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="style">
      ★★★★★
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    style () {
      return `width:${this.rate / 2}em`
    }
  }
}
</script>

<style lang="scss">
.rate{
  position: relative;
  display: inline-block;
  .hollow{
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>

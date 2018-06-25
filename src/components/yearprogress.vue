<template>
  <div class="progressbar">
    <progress :percent="percent" activeColor="#EA5A49" />
    <p>
      {{year}}年已经过了{{days}}天,{{percent}}%
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    isLeaFyear () {
      let year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeaFyear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = Date.now() - new Date(start).getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days / this.getDayOfYear() * 100).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.progressbar{
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 10px;
  progress{
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div>
    图书id{{bookid}}
  </div>
</template>
<script>
import {get} from '@/util'
export default {
  data () {
    return {
      bookid: ''
    }
  },
  methods: {
    async getBookDetail () {
      let res = await get('/weapp/bookdetail', {id: this.bookid})
      console.log(res)
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getBookDetail()
  }
}
</script>
<style lang="scss">

</style>

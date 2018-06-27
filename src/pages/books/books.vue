<template>
  <div>
    <topSwiper v-if="top.length" :tops="top"></topSwiper>
    <card v-for="book in books" :key="book.isbn" :book="book"></card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
import {get} from '@/util'
import card from '@/components/card'
import topSwiper from '@/components/topswiper'
export default {
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      top: []
    }
  },
  onShow () {
    this.getBookList(true)
    this.getTop()
  },
  onPullDownRefresh () {
    this.getBookList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page += 1
    this.getBookList()
  },
  methods: {
    async getBookList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      let res = await get('/weapp/booklist', {page: this.page})
      if (res.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = res.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(res.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      let res = await get('/weapp/top')
      this.top = res.list
    }
  },
  components: {
    card,
    topSwiper
  }
}
</script>
<style>

</style>

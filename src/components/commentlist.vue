<template>
  <div class="comments-list">
    <div class="page-title">
      评论
    </div>
    <div class="comment-item" v-for="comment in commentslist" :key="comment.id" @click="handleLook(comment)">
      <div class="user">
        <div class="inline">
          <img :src="comment.image" calss="avatarUrl" mode="aspectFit">
          {{comment.title}}
        </div>
        <div class="right">
          {{comment.location || '未知位置'}}
          <span class="text-primary">--</span>
          {{comment.phone || '未知型号'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentslist: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleLook (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: `/pages/detail/main?id=${comment.bookid}`
        })
      }
    }
  }
}
</script>

<style lang="scss">
.comments-list{
  background: #eee;
  font-size: 14px;
  .page-title{

  }
  .comment-item{
    background: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    .user{
      .inline{
        display: inline;
        >img{
          height: 20px;
          width: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .right{

      }
    }
    .content{
      margin: 10px 0;
    }
  }
}
</style>

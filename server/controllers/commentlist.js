const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {bookid, openid} = ctx.request.query
  const mysqlSelect = mysql('comments')
                                        .select('comments.*', 'cSessionInfo.user_info')
                                        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let comments
  if (bookid) {
    // 图书详情页评论列表
    comments = await mysqlSelect.where('bookid', bookid)
  } else {
    // 评论页面评论列表
    comments = await mysqlSelect.where('openid', openid)
  }
  ctx.state.data = {
    list: comments.map((item) => {
      const info = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}

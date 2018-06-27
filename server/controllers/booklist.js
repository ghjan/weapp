const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {page, openid} = ctx.request.query
  const size = 10
  const booksSelect = mysql('books')
                              .select('books.*', 'cSessionInfo.user_info')
                              .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                              .orderBy('books.id', 'desc')
  let books
  if (openid) {
    // 如果用户已登录
    books = await booksSelect.where('books.openid', openid)
  } else {
    // 全部图书   分页
    books = await booksSelect.limit(size)
                             .offset(Number(page) * size)
  }
  ctx.state.data = {
    list: books.map((item) => {
      let info = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        user_info: {
          nickName: info.nickName
        }
      })
    })
  }
}

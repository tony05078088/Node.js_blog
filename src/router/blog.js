const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModal } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  //   獲取blog列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  //   獲取blog 細節
  if (method === "GET" && req.path === "/api/blog/detail") {
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  //   新建一篇blog
  if (method === "POST" && req.path === "/api/blog/new") {
    const data = newBlog(req.body);
    return new SuccessModel(data);
  }

  //   更新一篇blog
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    if (result) return new SuccessModel();
    else {
      return new ErrorModal("更新blog失敗");
    }
  }

  //   刪除一篇blog
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "這是更新blog的接口",
    };
  }
};

module.exports = handleBlogRouter;

const { getList, getDetail } = require("../controller/blog");
const { SuccessModel, ErrorModal } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  //   獲取blog列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  //   獲取blog 細節
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  //   新建一篇blog
  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "這是新建blog的接口",
    };
  }

  //   更新一篇blog
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "這是更新blog的接口",
    };
  }

  //   刪除一篇blog
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "這是更新blog的接口",
    };
  }
};

module.exports = handleBlogRouter;

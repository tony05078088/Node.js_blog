const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModal } = require("../model/resModel");

// 統一的登錄驗證函數
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModal("尚未登入"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  //   獲取blog列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);

    if (req.query.isadmin) {
      // 管理員介面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        // 未登錄
        return loginCheckResult;
      }
      // 強制只能查詢自己的blog
      author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  //   獲取blog 細節
  if (method === "GET" && req.path === "/api/blog/detail") {
    // const data = getDetail(id);
    // return new SuccessModel(data);
    const result = getDetail(id);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  //   新建一篇blog
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      //  未登錄
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  //   更新一篇blog
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      //  未登錄
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModal("更新blog 失敗");
      }
    });
  }

  //   刪除一篇blog
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      //  未登錄
      return loginCheckResult;
    }

    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModal("刪除blog失敗");
      }
    });
  }
};

module.exports = handleBlogRouter;

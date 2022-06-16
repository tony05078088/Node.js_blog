const handleBlogRouter = (req, res) => {
  const method = req.method;

  //   獲取blog列表
  if (method === "GET" && req.path === "/api/blog/list") {
    return {
      msg: "獲取blog列表接口",
    };
  }

  //   獲取blog 細節
  if (method === "GET" && req.path === "/api/blog/detail") {
    return {
      msg: "這是獲取blog細節的接口",
    };
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

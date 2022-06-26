const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blog where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc`;
  return exec(sql);
};

const getDetail = (id) => {
  return {
    id: 1,
    title: "標題A",
    content: "內容",
    createTime: 1655520547848,
    author: "林威廉",
  };
};

const newBlog = (blogData = {}) => {
  // blogData 是一個blog Object,包含 title, content 屬性
  return {
    id: 3, // 表示新建blog,插入到數據表裡的id
  };
};
const updateBlog = (id, blogData = {}) => {
  // id即為要更新blog的id
  // blogData 是一個blog Object,包含 title, content 屬性
  console.log("update blog: ", id, blogData);
  return true;
};

const deleteBlog = (id) => {
  // id => 刪除blog的 id
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};

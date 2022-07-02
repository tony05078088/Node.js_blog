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
  const sql = `select * from blog where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData 是一個blog Object,包含 title, content, author 屬性
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();
  const sql = `insert into blog (title,content,createtime,author) values('${title}', '${content}', '${createTime}', '${author}') `;

  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};
const updateBlog = (id, blogData = {}) => {
  // id即為要更新blog的id
  // blogData 是一個blog Object,包含 title, content 屬性

  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blog set title='${title}',content='${content}' where id=${id}`;
  return exec(sql).then((updateData) => {
    console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  // id => 刪除blog的 id
  const sql = `delete from blog where id='${id}' and author='${author}'`;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};

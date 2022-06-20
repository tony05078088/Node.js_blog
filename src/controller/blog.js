const getList = (author, keyword) => {
  // 先回傳假數(格式是正確的)
  return [
    {
      id: 1,
      title: "標題A",
      content: "內容",
      createTime: 1655520547848,
      author: "林威廉",
    },
    {
      id: 2,
      title: "標題B",
      content: "內容B",
      createTime: 1655520601268,
      author: "林小強",
    },
  ];
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

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
};

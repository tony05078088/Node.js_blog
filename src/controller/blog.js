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

module.exports = {
  getList,
  getDetail,
};

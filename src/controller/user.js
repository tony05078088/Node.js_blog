const Checklogin = (username, password) => {
  //   先使用假數據
  if (username === "zhangshan" && password === "123") {
    return true;
  }
  return false;
};

module.exports = {
  Checklogin,
};

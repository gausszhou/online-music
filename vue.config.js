module.exports = {
  devServer: {
    https: false,
    open: false
  },
  // 输出目录
  outputDir: 'dist',
  assetsDir:'static',
  // 配置相对路径
  publicPath: process.env.NODE_ENV === "production" ? "/online-music/" : "/",
  // 取消生成map文件
  productionSourceMap: false,
  // 去除文件哈希值
  filenameHashing: false
};

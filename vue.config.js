module.exports = {
  devServer: {
    https: true,
    open: false
  },
  // 输出目录
  outputDir: 'dist',
  assetsDir:'static',
  // 配置相对路径
  publicPath: process.env.NODE_ENV === "production" ? "/online-music/" : "/",
  // 生成map文件
  productionSourceMap: false,
  // 文件哈希值
  filenameHashing: true
};

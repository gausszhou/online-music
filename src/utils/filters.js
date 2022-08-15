// 定义全局的过滤器
export default {
  install: (Vue) => {
    Vue.filter("uppercase", (value) => value.toUpperCase());
    Vue.filter("lowercase", (value) => value.toLowerCase());
    // 处理时长 毫秒 转为 分秒
    Vue.filter("mstotime", (value) => {
      let duration = value;
      let min = parseInt(duration / 1000 / 60);
      min = min < 10 ? "0" + min : min;
      let sec = parseInt((duration / 1000) % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
    });
    // 处理时长 秒钟 转为 分秒
    Vue.filter("stotime", (value) => {
      let duration = value;
      let min = parseInt(duration / 60);
      min = min < 10 ? "0" + min : min;
      let sec = parseInt(duration % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
    });
    // 处理次数 转为 万 亿
    Vue.filter("numbertocount", (value) => {
      if (value > 10000) {
        if (value > 10000 * 10000) {
          return (value / (10000 * 10000)).toFixed(1) + "亿";
        } else {
          return (value / 10000).toFixed(1) + "万";
        }
      } else {
        return value;
      }
    });
    // 处理时间戳
    Vue.filter("timestamp", (value) => {
      let date = new Date(value).toISOString();
      return date.slice(0, 10) + " " + date.slice(11, 19);
    });
  }
};

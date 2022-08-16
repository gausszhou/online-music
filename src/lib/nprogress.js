import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });
const install = (Vue)=>{
  Vue.prototype.$nprogress = NProgress
}
export default {install}
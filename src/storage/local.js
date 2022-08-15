// localStorage

let local = {};
const prefix = "netease";
// const debug = process.NODE_ENV != "production";
const debug = false;

local.get = (key) => {
  let json = localStorage.getItem(`${prefix}-${key}`);
  let result = null;
  if (typeof json == "string") {
    result = JSON.parse(json);
  }
  return result;
};

local.set = (key, data) => {
  let json = JSON.stringify(data);
  if (debug) console.log("local.set", key, data);
  return localStorage.setItem(`${prefix}-${key}`, json);
};

local.remove = (key) => {
  if (debug) console.log("local.remove", key);
  return localStorage.removeItem(`${prefix}-${key}`);
};

local.clear = () => {
  if (debug) console.log("locals.clear");
  return localStorage.clear(key);
};

export default local;

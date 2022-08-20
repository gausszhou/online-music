import store from "@/store";

class Player {
  constructor() {
    this.audioEL = new Audio();
    this.crossOrign = "anonymous";
    console.log(this);
    // control
    this.volume = 0.5;
    // source
    this.src = "";

    // control
    this.playing = false;

    this.loadedPercent = 0; // source load percent
    this.currentTime = 0;
    this.totalTime = 0;
    this.currentPercent = 0; // song play percent

    this.init();
    this.initEventListener();
    console.log("[audio] 初始化完成");
  }
  init() {
    this.audioEL.src = this.src;
    this.audioEL.volume = this.volume;
  }
  play() {
    if (this.src) {
      this.audioEL.play();
      console.log("[audio] 播放");
      this.playing = true;
    }
  }
  pause() {
    if (this.src) {
      this.audioEL.pause();
      console.log("[audio] 暂停");
      this.playing = false;
    }
  }
  setAudioSrc(url) {
    if (this.src !== url) {
      this.src = url;
      this.audioEL.src = url;
      console.log("[audio] 切换了歌曲");
    }
  }
  setTargetTime(time) {
    this.audioEL.currentTime = time;
  }
  setVolume(volume) {
    this.volume = volume;
    this.audioEL.volume = this.volume;
  }
  initEventListener() {
    console.log("[audio] 事件绑定初始化");
    this.audioEL.addEventListener("canplay", (e) => {
      this._onCanplay(e);
    });
    this.audioEL.addEventListener("progress", (e) => {
      this._onProgress(e);
    });
    this.audioEL.addEventListener("timeupdate", (e) => {
      this._onTimeUpdate(e);
    });
  }
  // callback
  _onCanplay(e) {
    console.log("[audio] 歌曲可以播放");
    const totalTime = e.target.duration;
    this.totalTime = totalTime;
    this.onCanplay && this.onCanplay();
    store.commit("song/setSongTotalTime", this.totalTime);
  }
  _onProgress(e) {
    this.caclLoadProgress(e.target);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);
    console.log("[audio] 资源加载更新", this.loadedPercent);
    this.onProgress && this.onProgress();
  }
  _onTimeUpdate(e) {
    console.log("[audio] 播放进度更新");
    const currentTime = this.audioEL.currentTime;
    this.currentTime = currentTime;
    this.currentPercent = (this.currentTime * 100) / this.totalTime;
    this.caclLoadProgress(e.target);
    store.commit("song/setSongCurrentTime", this.currentTime);
    store.commit("song/setSongCurrentPercent", this.currentPercent);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);

    this.onTimeUpdate && this.onTimeUpdate();
  }
  // methods
  caclLoadProgress(audio) {
    const buffered = audio.buffered;
    if (buffered.length) {
      const loadedTime = audio.buffered.end(0);
      this.loadedPercent = 100 * (loadedTime / this.totalTime);
    }
  }
}

const player = new Player();

export default player;

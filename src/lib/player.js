import store from "@/store";
import local from "@/storage/local";

class Player {
  constructor() {
    this.audioEL = new Audio();
    this.crossOrign = "anonymous";
    // control
    this.volume = 50;
    this.songMode = 0;
    // source
    this.src = "";

    // control
    this.playing = false;

    this.loadedPercent = 0; // source load percent
    this.currentTime = 0;
    this.totalTime = 0;
    this.currentPercent = 0; // song play percent
    this.restore();
    this.init();
  }
  init() {
    this.audioEL.src = this.src;
    this.audioEL.volume = this.volume / 100;
    this.initEventListener();
  }
  initEventListener() {
    this.audioEL.addEventListener("canplay", (e) => {
      this._onCanplay(e);
    });
    this.audioEL.addEventListener("progress", (e) => {
      this._onProgress(e);
    });
    this.audioEL.addEventListener("timeupdate", (e) => {
      this._onTimeUpdate(e);
    });
    this.audioEL.addEventListener("ended", (e) => {
      this._onEnded(e);
    });
    this.audioEL.addEventListener("error", (e) => {
      this._onError(e);
    });
    console.log("[audio] 初始化事件绑定完成");
  }
  restore() {
    setTimeout(() => {
      let song = local.get("song")
      if(song && song.audioUrl){
        store.commit("song/setSong", song);
        console.log("[info] 恢复歌曲配置");
      }
    });
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
      console.log("[audio] 切换了歌曲", url);
      this.src = url;
      this.audioEL.src = url;
    }
  }
  // set
  setMode(mode) {
    this.songMode = mode;
    console.log("[audio] 切换了模式", mode);
  }
  setVolume(volume) {
    this.volume = volume;
    this.audioEL.volume = this.volume / 100;
  }
  setTargetTime(time) {
    this.audioEL.currentTime = time;
  }
  // callback
  _onCanplay(e) {
    const totalTime = e.target.duration;
    this.totalTime = totalTime;
    store.commit("song/setSongIndexActive");
    store.commit("song/setSongTotalTime", this.totalTime);
    console.log("[audio] 歌曲可以播放");
  }
  _onProgress(e) {
    this.caclLoadProgress(e.target);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);
    console.log("[audio] 资源加载更新", this.loadedPercent, "%");
  }
  _onTimeUpdate(e) {
    const currentTime = this.audioEL.currentTime;
    this.currentTime = currentTime;
    this.currentPercent = (this.currentTime * 100) / this.totalTime;
    this.caclLoadProgress(e.target);
    store.commit("song/setSongCurrentTime", this.currentTime);
    store.commit("song/setSongCurrentPercent", this.currentPercent);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);
  }
  _onEnded() {
    store.dispatch("song/switchSong", 1, true);
    console.log("[audio] 切换到下一首");
  }
  _onError(e) {
    this.playing = false;
    store.commit("song/setSongIsPlay", false);
    console.log("[audio] 歌曲加载失败", e);
  }
  // methods
  caclLoadProgress(audio) {
    const buffered = audio.buffered;
    if (buffered.length) {
      const loadedTime = audio.buffered.end(0);
      this.loadedPercent = Math.ceil(100 * (loadedTime / this.totalTime));
      if (this.loadedPercent == Infinity) this.loadedPercent = 0;
    }
  }
}

const player = new Player();

export default player;

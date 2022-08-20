import store from "@/store";
import local from "@/storage/local"

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

    this.init();
    this.initEventListener();
    this.restore()
  }
  init() {
    this.audioEL.src = this.src;
    this.audioEL.volume = this.volume / 100;
    console.log("[audio] 初始化");
  }
  initEventListener() {
    console.log("[audio] 初始化事件绑定");
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
  }
  restore(){
    setTimeout(()=>{store.commit("song/setSong",local.get("song"))})
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
  // set
  setMode(mode) {
    this.songMode = mode;
    store.commit("song/setSongMode", mode);
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
    console.log("[audio] 歌曲可以播放");
    const totalTime = e.target.duration;
    this.totalTime = totalTime;
    this.onCanplay && this.onCanplay();
    store.commit("song/setSongTotalTime", this.totalTime);
  }
  _onProgress(e) {
    this.caclLoadProgress(e.target);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);
    console.log("[audio] 资源加载更新", this.loadedPercent, "%");
    this.onProgress && this.onProgress();
  }
  _onTimeUpdate(e) {
    const currentTime = this.audioEL.currentTime;
    this.currentTime = currentTime;
    this.currentPercent = (this.currentTime * 100) / this.totalTime;
    this.caclLoadProgress(e.target);
    store.commit("song/setSongCurrentTime", this.currentTime);
    store.commit("song/setSongCurrentPercent", this.currentPercent);
    store.commit("song/setSongLoadedPercent", this.loadedPercent);

    this.onTimeUpdate && this.onTimeUpdate();
  }
  _onEnded() {
    this.switchSong(1, true);
  }
  prevSong() {
    this.switchSong(-1, false);
  }
  nextSong() {
    this.switchSong(1, false);
  }
  // 区分手动和自动
  switchSong(num, auto) {
    let number = 0;
    switch (this.songMode) {
      case 0: // loop
        number = num;
        this.setSong(number);
        break;
      case 1: // single-loop
        if (auto) {
          store.commit("song/setSongIsPlay", false);
          setTimeout(() => {
            store.commit("song/setSongIsPlay", true);
          });
        } else {
          setTimeout(() => {
            this.onAudioSliderChange(0);
          });
        }
        break;
      case 2: // order
        const lastIndex = this.songList.length - 1;
        if (this.songIndex == lastIndex && auto) {
          store.commit("song/setSongIndex", -1);
          return;
        }
        number = 1;
        this.setSong(number);
        break;
      case 3: // random
        // number [0, lenght) == [0, lenght-1]
        const length = store.state.song.songList.length;
        number = Math.floor(Math.random() * length);
        this.setSong(number);
        break;
      default:
        break;
    }
  }
  // -1 0 1
  setSong(number) {
    const songList = store.state.song.songList;
    const songIndex = store.state.song.songIndex;
    const length = songList.length;
    if (length > 1) {
      const targetIndex = (songIndex + length + number) % length;
      store.commit("song/setSongCurrentTime", 0);
      store.commit("song/setSongIndex", targetIndex);
      const next = songList[targetIndex];
      store.dispatch("song/getMusic", next);
    }
  }
  // methods
  caclLoadProgress(audio) {
    const buffered = audio.buffered;
    if (buffered.length) {
      const loadedTime = audio.buffered.end(0);
      this.loadedPercent = Math.ceil(100 * (loadedTime / this.totalTime));
      if(this.loadedPercent == Infinity) this.loadedPercent = 0
    }
  }
}

const player = new Player();

export default player;

<template>
  <div class="video-player">
    <video class="video-js vjs-custom-skin" :class="{ 'live': options.live }"></video>
  </div>
</template>

<script>
// 必需先安装videojs，-- :  $ npm install --S video.js
var videojs = require('video.js')

var languages = require('./languages.js')

export default {
  name: 'video-player',
  data: function () {
    return {
      customEventName: 'player-state-changed'
    }
  },
  props: {
    options: {
      type: Object,
      required: true,
      youtube: false,
      vimeo: false,
      switcher: true,
      hls: true
    }
  },
  created: function () {
    // Vue2.0 $on监听父组件命令
    if (this.$parent) {
      var _this = this
      this.$parent.$on('playerAction', function (action, options) {
        _this.doAction(action, options)
      })
    }
  },
  ready: function () {
    if (this.options) { this.initialize() }
  },
  mounted: function () {
    if (this.options) { this.initialize() }
  },
  beforeDestroy: function () {
    this.dispose()
  },
  methods: {

    // 构建播放器
    initialize: function () {
      // console.log('init build player')
      // init
      var options = this.options

      if (options.hls) require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
      if (options.youtube) require('videojs-youtube')
      if (options.vimeo) require('videojs-vimeo')
      if (options.switcher) require('videojs-resolution-switcher')

      // start_time
      options.start = options.start || 0
      // is_live?
      options.live = options.live || false
      // player_src
      options.source = options.source || false
      // playbackRates [0.7, 1.0, 1.5, 2.0]
      options.playbackRates = options.playbackRates || false
      // player defaultSrcReId
      options.defaultSrcReId = options.defaultSrcReId || 1
      // default muted
      options.muted = options.muted || false
      // playsinline
      options.playsinline = options.playsinline !== undefined ? options.playsinline : true

      // 自定义事件名称
      var customEventName = options.customEventName || this.customEventName

      if (typeof options.source !== 'object') {
        this.dispose()
        return console.error('video resource must be a object or array')
      } else {
        if (options.source instanceof Array) {
          for (var i = 0, length = options.source.length; i < length; i++) {
            var item = options.source[i]
            if (!item.src) {
              this.dispose()
              return console.warn('video resource is illegitimate')
            }
          }
        } else {
          if (!options.source.src) {
            this.dispose()
            return console.warn('video resource is illegitimate')
          }
        }
      }

      // controlBar config 控制条的dom结构控制
      var controlBar = {
        remainingTimeDisplay: false,
        playToggle: {},
        progressControl: {},
        fullscreenToggle: {},
        volumeMenuButton: {
          inline: false,
          vertical: true
        }
      }

      // 直播
      if (options.live) {
        controlBar.timeDivider = false
        controlBar.durationDisplay = false
        controlBar.currentTimeDisplay = false
      }

      // build player config
      var video_options = {
        'controls': options.controls !== undefined ? options.controls : true,
        'autoplay': options.autoplay !== undefined ? options.autoplay : true,
        'preload': options.preload || 'auto',
        'poster': options.poster || '',
        'width': options.width || '100%',
        'height': options.height || 360,
        'fluid': options.fluid || false,
        'controlBar': options.controlBar || controlBar,
        'language': options.language || 'en',
        'techOrder': options.techOrder || ['html5', 'flash'],
        'flash': { hls: { withCredentials: false }},
        'html5': { hls: { withCredentials: false }},
        'youtube': { 'ytControls': options.ytControls ? Number(options.ytControls) : 0 }
      }

      // 添加指定语言
      var language = video_options.language
      videojs.addLanguage(language, languages[language])

      // 是否应用IOS下的禁止自动全屏
      var playsinline = options.playsinline
      playsinline && (this.$el.children[0].setAttribute('playsinline', playsinline), this.$el.children[0].setAttribute('webkit-playsinline', playsinline))

      // 是否适用youtube
      // if (video_options.techOrder.indexOf('youtube') > -1) require('videojs-youtube')

      // 非直播情况
      if (!options.live) {
        // 单独播放资源
        if (options.source.src) {
          video_options.sources = [options.source]

        // 多播放源切换
        } else {
          video_options.plugins = { videoJsResolutionSwitcher: { default: options.defaultSrcReId, dynamicLabel: true }}
        }

        // 是否使用播放速度控制
        var playbackRates = options.playbackRates
        if (!!playbackRates && !!playbackRates.length) video_options.playbackRates = playbackRates
      }

      // 实例化播放器
      var _this = this
      this.player = null
      this.player = videojs(this.$el.children[0], video_options, function () {
        // 是否应用多版本切换清晰度
        if (!options.live) {
          if (options.source.length) {
            this.updateSrc(options.source)
            this.on('resolutionchange', function () {
              _this.$emit && _this.$emit(customEventName, { resolutionchange: this.src() })
              _this.$dispatch && _this.$dispatch(customEventName, { resolutionchange: this.src() })
            })
          }
        }

        if (options.live) {
          // console.log('live video', this, options.source)
          this.src(options.source)

          // var hls = this.tech({ IWillNotUseThisInPlugins: true }).hls
          // 直播每次的切片请求
          /*
          this.tech_.hls.xhr.beforeRequest = function(options) {
            console.log(options)
            return options
          }
          */
        }

        // 监听播放
        this.on('play', function () {
          _this.$emit && _this.$emit(customEventName, { play: true })
          _this.$dispatch && _this.$dispatch(customEventName, { play: true })
        })

        // 监听暂停
        this.on('pause', function () {
          _this.$emit && _this.$emit(customEventName, { pause: true })
          _this.$dispatch && _this.$dispatch(customEventName, { pause: true })
        })

        // 监听结束
        this.on('ended', function () {
          _this.$emit && _this.$emit(customEventName, { ended: true })
          _this.$dispatch && _this.$dispatch(customEventName, { ended: true })
        })

        // 元文件信息
        this.on('loadeddata', function () {
          if (!options.live && !!options.start) this.currentTime(options.start)
          this.muted(_this.options.muted)
          _this.$emit && _this.$emit(customEventName, { loadeddata: true })
          _this.$dispatch && _this.$dispatch(customEventName, { loadeddata: true })
        })

        this.on('waiting', function () {
          _this.$emit && _this.$emit(customEventName, { waiting: true })
          _this.$dispatch && _this.$dispatch(customEventName, { waiting: true })
        })

        this.on('playing', function () {
          _this.$emit && _this.$emit(customEventName, { playing: true })
          _this.$dispatch && _this.$dispatch(customEventName, { playing: true })
        })

        // 监听时间
        this.on('timeupdate', function () {
          _this.$emit && _this.$emit(customEventName, { currentTime: this.currentTime() })
          _this.$dispatch && _this.$dispatch(customEventName, { currentTime: this.currentTime() })
        })
      })
    },
    // 释放播放器
    dispose: function () {
      if (!!this.player && !!videojs) {
        // this.player.dispose()
        this.player.pause && this.player.pause()
        videojs(this.$el).dispose()
        delete this.player
      }
    },
    // 操作播放器
    doAction: function (action, options) {
      // console.log(action)
      if (!this.player) return
      if (action == 'sliderDrag') this.player.currentTime(options.currentTime)
      if (action == 'play') this.player.play()
      if (action == 'pause') this.player.pause()
      if (action == 'refresh') {
        if (!this.options.live) {
          this.player.currentTime(0)
          this.player.play()
        }
      }
    }
  },
  // Vue1.X监听父组件传播下来的事件
  events: {
    'playerAction': function (action) {
      this.doAction(action)
    }
  },
  watch: {
    // 观察选项的动态变化，选项变化了就重新初始化播放器
    options: {
      handler: function (newVal, oldVal) {
        var options = newVal
        if (typeof options.source !== 'object') {
          this.dispose()
          return console.error('video resource must be a object or array')
        } else {
          if (options.source instanceof Array) {
            for (var i = 0, length = options.source.length; i < length; i++) {
              var item = options.source[i]
              if (!item.src) {
                this.dispose()
                return console.warn('video resource is illegitimate')
              }
            }
          } else {
            if (!options.source.src) {
              this.dispose()
              return console.warn('video resource is illegitimate')
            }
          }
        }
        if (this.player) this.player.src(this.options.source)
        if (!this.player) this.initialize()
      },
      deep: true
    }
  }
}
</script>

<style src="video.js/dist/video-js.css"></style>

<style lang="css">
.video-js.vjs-custom-skin {
  width: 100%;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}

.video-js.vjs-custom-skin .vjs-menu-button-inline.vjs-slider-active,.video-js.vjs-custom-skin .vjs-menu-button-inline:focus,.video-js.vjs-custom-skin .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em
}

.video-js.vjs-custom-skin .vjs-controls-disabled .vjs-big-play-button {
  display: none!important
}

.video-js.vjs-custom-skin .vjs-control {
  width: 3em
}

.video-js.vjs-custom-skin .vjs-control.vjs-live-control{
  width: auto;
  padding-left: .5em;
  letter-spacing: .1em;
}

.video-js.vjs-custom-skin .vjs-menu-button-inline:before {
  width: 1.5em
}

.vjs-menu-button-inline .vjs-menu {
  left: 3em
}

.vjs-paused.vjs-has-started.video-js.vjs-custom-skin .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button {
  display: block
}

.video-js.vjs-custom-skin .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button {
  display: none!important
}

.video-js.vjs-custom-skin .vjs-mouse-display:after,.video-js.vjs-custom-skin .vjs-play-progress:after {
  padding: 0 .4em .3em
}

.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}

.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}

.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button,.vjs-paused.vjs-has-started.video-js.vjs-custom-skin .vjs-big-play-button {
  display: block
}

.video-js.vjs-custom-skin .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em
}

.video-js.vjs-custom-skin .vjs-big-play-button {
  background-color: rgba(0,0,0,0.45);
  font-size: 3.5em;
   /*border-radius: 50%;*/
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important
}

.video-js:hover .vjs-big-play-button,.video-js.vjs-custom-skin .vjs-big-play-button:focus,.video-js.vjs-custom-skin .vjs-big-play-button:active {
  background-color: rgba(36,131,213,0.9)
}

.video-js.vjs-custom-skin .vjs-loading-spinner {
  border-color: rgba(36,131,213,0.8)
}

.video-js.vjs-custom-skin .vjs-control-bar2 {
  background-color: #000000
}

.video-js.vjs-custom-skin .vjs-control-bar {
   /*background-color: rgba(0,0,0,0.3) !important;*/
  color: #ffffff;
  font-size: 14px
}

.video-js.vjs-custom-skin .vjs-play-progress,.video-js.vjs-custom-skin  .vjs-volume-level {
  background-color: #2483d5
}

.video-js.vjs-custom-skin .vjs-play-progress:before {
  top: -0.3em;
}

.video-js.vjs-custom-skin .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.3em;
}

.vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0em;
}

.video-js.vjs-custom-skin .vjs-menu li {
  padding: 0;
  line-height: 2em;
  font-size: 1.1em;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}

.video-js.vjs-custom-skin .vjs-time-tooltip,
.video-js.vjs-custom-skin .vjs-mouse-display:after,
.video-js.vjs-custom-skin .vjs-play-progress:after {
  border-radius: 0;
  font-size: 1em;
  padding: 0;
  width: 3em;
  height: 1.5em;
  line-height: 1.5em;
  top: -3em;
}

.video-js.vjs-custom-skin .vjs-menu-button-popup .vjs-menu {
  width: 5em;
  left: -1em;
}

.video-js.vjs-custom-skin .vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-resolution-button .vjs-menu {
   /*order: 4;*/
}

 /*排序顺序*/
.video-js.vjs-custom-skin .vjs-control-bar .vjs-play-control {
  order: 0;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-time-control {
  min-width: 1em;
  padding: 0;
  margin: 0 .1em;
  text-align: center;
  display: block;
  order: 1;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value{
  font-size: 1.2em;
  line-height: 2.4;
}

.video-js.vjs-custom-skin .vjs-progress-control.vjs-control {
  order: 2;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-volume-menu-button {
  order: 3;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-resolution-button {
  order: 4;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-resolution-button .vjs-resolution-button-label {
  display: block;
  line-height: 3em;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-playback-rate {
  order: 5;
}

.video-js.vjs-custom-skin .vjs-control-bar .vjs-fullscreen-control {
  order: 6;
}

video::-webkit-media-controls {
  display:none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}
</style>

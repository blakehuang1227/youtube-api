<template>
  <div>
    <div class="video-wrap">
      <video
        id="my-video"
        class="video-js vjs-default-skin vjs-16-9"
        controls
        preload="auto"
        width="auto"
        height="auto"
        data-setup="{}"
      >
        <source
          id="source"
          src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          type="application/x-mpegURL"
        />
      </video>
    </div>
    <div class="text-wrap">
      <div class="title">影片標題:{{data.snippet.title || ''}}</div>
      <div class="desc">介紹:{{data.snippet.description || ''}}</div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import video from "videojs-contrib-hls";
import "video.js/dist/video-js.css";
export default {
  data() {
    return {};
  },
  props: ["data"],
  methods: {},
  created() {
    console.log(this.data);
    // if (this.data === undefined) {
    //   this.$router.push("/Home");
    // }
  }
};
</script>


<style scoped>
.video-wrap {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  max-width: 800px;
}
.text-wrap {
  margin: 0 auto;
  max-width: 800px;
}
.title {
  font-weight: bold;
}
.desc {
  font-size: 15px;
}

@media screen and (max-width: 750px) {
  .video-wrap {
    height: inherit;
    margin: 30px;
    margin-top: 120px;
  }
}
</style>



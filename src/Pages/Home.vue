<template>
  <div id="home">
    <div class="video-wrap" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="flex-row" ref="item">
        <div
          class="item"
          v-for="video in videos"
          :key="video.id"
          @click="$router.push({ name:'Player', params: { data: video }})"
        >
          <div class="flex-col">
            <div class="img-wrap">
              <img :src="video.snippet.thumbnails.high.url" />
              <font-awesome-icon
                class="heart"
                :icon="['fas', 'heart']"
                @click="favor(video)"
                :class="{'favor':video.favor}"
              />
              <span class="time">{{convertDuration(video.contentDetails.duration)}}</span>
            </div>
            <div class="title">{{video.snippet.title}}</div>
            <div class="desc">{{subString(video.snippet.description)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination
        class="page"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        :layout="layoutSetting"
        :total="totalVideos"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      fullscreenLoading: true,
      originData: [],
      videos: [],
      totalVideos: 0,
      nextPageToken: "",
      layoutSetting: "total, prev, pager, next, jumper",
      pageSize: 12,
      currentPage: 0,
      screenWidth: window.innerWidth
    };
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 500) {
        this.layoutSetting = "prev, pager, next";
      } else {
        this.layoutSetting = "total, prev, pager, next, jumper";
      }
    },
    createBeforeunloadHandler() {
      window.addEventListener("resize", this.onResize);
    },
    destroyedBeforeunloadHandler() {
      window.removeEventListener("resize", this.onResize);
    },
    favor(video) {
      event.stopPropagation();
      let favor = localStorage.getItem("favor");
      if (favor) {
        favor = JSON.parse(favor);
        let existMark = favor.some(x => {
          console.log(x);
          return x === video.id;
        });
        if (existMark === false) {
          favor.push(video.id);
          this.$set(video, "favor", true);
          // video.favor = true;
        } else {
          favor = favor.filter(x => {
            return x != video.id;
          });
          this.$set(video, "favor", false);
          // video.favor = false;
        }
      } else {
        this.$set(video, "favor", true);
        favor = [video.id];
      }

      localStorage.setItem("favor", JSON.stringify(favor));
    },
    handleCurrentChange(val) {
      if (val != undefined) {
        this.currentPage = val;
      }
      this.videos = this.originData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );

      this.$nextTick(() => {
        console.log(this.$refs.item);
        this.$refs.item.scrollTop = 0;
      });
    },
    getData() {
      return this.$axios({
        method: "get",
        url:
          "https://www.googleapis.com/youtube/v3/videos?maxResults=50&chart=mostPopular&part=snippet%2CcontentDetails%2Cstatistics&regionCode=TW&key=AIzaSyCpF5pvKi5cN-2fnmXZUV1dMLYkDT5DjBo",
        responseType: "json"
      }).then(res => {
        let _this = this;
        this.originData = res.data.items;
        this.nextPageToken = res.data.nextPageToken;

        this.$axios({
          method: "get",
          url:
            "https://www.googleapis.com/youtube/v3/videos?maxResults=50&chart=mostPopular&part=snippet%2CcontentDetails%2Cstatistics&regionCode=TW&key=AIzaSyCpF5pvKi5cN-2fnmXZUV1dMLYkDT5DjBo&pageToken=" +
            this.nextPageToken,
          responseType: "json"
        })
          .then(res => {
            this.originData = this.originData.concat(res.data.items);
            this.totalVideos = this.originData.length;

            //處理favor
            let favor = localStorage.getItem("favor");
            if (favor) {
              favor = JSON.parse(favor);
              let _this = this;
              favor.forEach(y => {
                this.originData.forEach(x => {
                  if (y === x.id) {
                    _this.$set(x, "favor", true);
                  }
                });
              });
            }

            this.videos = this.originData.slice(0, this.pageSize);
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    convertDuration(timeStr) {
      return timeStr
        .replace("PT", "")
        .replace("M", "分")
        .replace("S", "秒");
    },
    subString(str) {
      return str.substring(0, 50);
    }
  },
  computed: {},
  created() {
    this.createBeforeunloadHandler();
    this.getData();
  },
  beforeDestroy() {
    this.destroyedBeforeunloadHandler();
  }
};
</script>


<style scoped>
#home {
  height: 100%;
  width: 100%;
  /* margin-top: 60px; */
}
</style>

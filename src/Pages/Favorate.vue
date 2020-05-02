<template>
  <div id="favorate">
    <div v-if="!noFavor">
      <div class="video-wrap">
        <div class="flex-row">
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
    <div v-else class="notData">
      <font-awesome-icon :icon="['fas', 'exclamation-circle']" />沒有收藏
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      originData: [],
      videos: [],
      totalVideos: 0,
      layoutSetting: "total, prev, pager, next, jumper",
      pageSize: 12,
      currentPage: 0,
      screenWidth: window.innerWidth,
      noFavor: false
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
          //   this.$set(video, "favor", true);
          video.favor = true;
        } else {
          favor = favor.filter(x => {
            return x != video.id;
          });
          //   this.$set(video, "favor", false);
          video.favor = false;
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
    },
    getData() {
      let favor = localStorage.getItem("favor");
      if (favor) {
        favor = JSON.parse(favor);
        if (favor.length === 0) {
          this.noFavor = true;
          return "";
        }
        favor.forEach(x => {
          //www.googleapis.com/youtube/v3/videos?part=snippet&id=xE_rMj35BIM&key=YOUR_KEY
          https: this.$axios({
            method: "get",
            url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${x}&key=AIzaSyCpF5pvKi5cN-2fnmXZUV1dMLYkDT5DjBo`,
            responseType: "json"
          }).then(res => {
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
          });
        });
        this.noFavor = false;
      } else {
        this.noFavor = true;
      }
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
  height: 100vh;
  width: 100vw;
}
.notData {
  margin: 40px auto;
  font-weight: bold;
  color: black;
  font-size: 44px;
}
</style>

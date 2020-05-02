<template>
  <div id="app">
    <v-head :key="$router.currentRoute.meta.title"></v-head>

    <router-view></router-view>
  </div>
</template>

<script>
import vHead from "./component/header.vue";

export default {
  name: "app",
  components: {
    vHead
  },
  data() {
    return {};
  }
};
</script>

<style>
@import "./assets/font/font.css";

* {
  font-family: "Noto Sans TC", "roboto", "Avenir", Helvetica, Arial, sans-serif;
}
body {
  display: block;
  margin: 0px;
  height: calc(100vh - 60px);
  width: 100vw;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  text-align: center;
  /* color: white; */
  margin-top: 60px;
  /* background: #18191a; */
  height: 100%;
  width: 100%;
  overflow: hidden;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.video-wrap {
  width: 85%;
  margin: auto;
}
.flex-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 83vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-col img {
  width: 240px;
  height: 150px;
}
.item {
  width: 350px;
  height: 270px;
  border: 1px solid #c5c5c5;
  padding: 15px 5px;
  margin: 15px;
  box-shadow: -3px 12px 20px -10px rgba(0, 0, 0, 1);
  text-align: left;
}
.img-wrap {
  position: relative;
}
.img-wrap .time {
  position: absolute;
  right: 0;
  bottom: 5px;
  color: white;
  font-size: 12px;
}

.title {
  font-weight: bold;
}
.desc {
  color: #626262;
  font-size: 14px;
  overflow: hidden;
}

.heart {
  position: absolute;
  left: 0;
  bottom: 5px;
  color: white;
  font-size: 22px;
}

.heart:hover {
  color: #ef3f3f;
}
.favor {
  color: #ef3f3f;
}

.page {
  margin-top: 10px;
}
</style>

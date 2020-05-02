<template>
  <div class="header">
    <div class="header-items">
      <div
        @click="$router.push('/Home')"
        :class="{'active-router':($router.currentRoute.fullPath === '/Home')}"
      >首頁</div>
      <div
        @click="$router.push('/Favorate')"
        :class="{'active-router':($router.currentRoute.fullPath === '/Favorate')}"
      >收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vHead",
  data() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
.header {
  height: 60px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: -3px -1px 20px -10px rgba(0, 0, 0, 1);
  background: #2f2f2f;
  z-index: 5;
}
.header-items {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
}
.header-items div {
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 5px;
  color: white;
  font-weight: bold;
}

.header-items div.active-router {
  background: #ff9900;
  color: black;
}
</style>

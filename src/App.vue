<template>
  <div class="app_container">
    <div class="common-layout">
      <el-container>
        <el-header
          style="display: flex; width: 100%;padding: 0"
        >
          <HeaderComponent />
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<style scoped>
/* 手动配置全局样式 */
html,
body,
.app_container,
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>

<style>
#app {
  margin: 0%;
  padding: 0%;
  max-width: 100%;
}
</style>


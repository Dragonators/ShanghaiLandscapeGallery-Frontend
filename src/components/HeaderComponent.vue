<template>
  <el-page-header
    :icon="currentIcon"
    @back="onBack"
    :title="title"
    ref="header"
    style="width: 100%;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);display: flex;">
    <template #content>
      <div class="my-page-header">
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          style=""
        />
        <el-text size="large" style="margin-left: 1vw;font-weight: bold;color: #181818">上海景点图像展示系统</el-text>
        <pagination-component style="margin-left: 6vw" />
      </div>
    </template>
    <template #extra>
      <div class="my-page-header-right">
        <search-component style="display: flex; margin-right: 1vw" />
        <el-button v-if="oidcIsAuthenticated"
                   href @click.prevent="signOut"
                   type="primary"
                   class="ml-2"
                   style="margin-left: auto">注销
        </el-button>
        <el-button v-else
                   href @click.prevent="authenticateOidc"
                   type="primary"
                   class="ml-2"
                   style="margin-left: auto">登录
        </el-button>
      </div>
    </template>
  </el-page-header>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'

const title = ref('')
const router = useRouter()
const currentIcon = ref(ArrowLeft)

let path = ref('')
const route = useRoute()
const store = useStore()
path.value = route.path

const oidcIsAuthenticated = computed(() => store.getters['oidcStore/oidcIsAuthenticated']);
const authenticateOidc = async() => store.dispatch('oidcStore/authenticateOidc');
const removeOidcUser = async() =>store.dispatch('oidcStore/removeOidcUser');

const signOut = async () => {
  removeOidcUser().then(() => {
    router.push('/');
  });
}
const onBack = () => {
  router.push({ name: 'home' })
}
const handleNonHomeBackParam = () => {
  if (route.path === '/') {
    currentIcon.value = null
    title.value = ' '
  } else {
    currentIcon.value = ArrowLeft
    title.value = 'Back'
  }
}
watch(() => route.path, () => {
  handleNonHomeBackParam()
}, { immediate: true })
</script>

<style scoped>
.my-page-header {
  display: flex;
}

.my-page-header-right {
  display: flex;
  margin-right: 1vw;
}
</style>
<style>
.el-page-header__header {
  width: 100%;
}
</style>

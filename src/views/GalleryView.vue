<template>
  <div class="gallery">
    <el-scrollbar max-height="87vh">
      <el-row :gutter="0">
        <el-col
          class="el-col"
          :span="6"
          v-for="(image, index) in imageSrcList"
          :key="index"
          @mouseenter="showButton(index)"
          @mouseleave="hideButton"
        >
          <el-image
            :src="imageSrcList[index]"
            :preview-src-list="imageSrcList"
            :initial-index="index"
            class="thumbnail"
            loading="lazy"
            fit="cover"
            hide-on-click-modal="true"
            style="width: 24vw; height: 30vh; border-radius: 4px"
          >
          </el-image>
          <transition name="fade-in-up">
            <el-button
              class="comment-btn"
              v-if="hoverIndex === index"
              @click="viewImageInfo(index)"
              size="large"
            >
              <el-text class="btn-text">评论</el-text>
            </el-button>
          </transition>
          <transition name="fade-in-up" v-if="oidcIsAuthenticated">
            <el-button
              class="del-btn"
              v-if="hoverIndex === index"
              @click="delImage(index)"
              size="large"
            >
              <el-text class="btn-text">删除</el-text>
            </el-button>
          </transition>
          <transition name="fade-in-up" v-if="oidcIsAuthenticated">
            <el-button
              class="update-btn"
              v-if="hoverIndex === index"
              @click="showImageUpdate(index)"
              size="large"
            >
              <el-text class="btn-text">编辑</el-text>
            </el-button>
          </transition>
        </el-col>
      </el-row>
      <router-view class="overlay" v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
  <image-upload-component v-if="oidcIsAuthenticated" @up-loaded="refreshImages" />
  <image-update-component v-if="oidcIsAuthenticated" ref="editChildRef" @up-dated="refreshImages" />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import imageApi from '@/api/image.js'
import ImageUploadComponent from '@/components/ImageUploadComponent.vue'
import { ElMessage } from 'element-plus'
import ImageUpdateComponent from '@/components/ImageUpdateComponent.vue'

const router = useRouter()
const store = useStore()

const images = ref([])
const ids = ref([])
const imageSrcList = ref([])
const hoverIndex = ref(null)
const editChildRef = ref(null)

const oidcIsAuthenticated = computed(() => store.getters['oidcStore/oidcIsAuthenticated']);

onMounted(async () => {
  await refreshImages()
  await store.dispatch('endRefresh');
})

const refreshImages = async () => {
  imageSrcList.value = []
  images.value = []
  ids.value = []
  const eventSource = new EventSource(buildQueryString(store.getters.ImageQuery))
  eventSource.onmessage = (event) => {
    try {
      const image = JSON.parse(event.data)
      images.value.push({ Id: image.Id })
      ids.value.push({ Id: image.Id })
      imageSrcList.value.push('data:image/png;base64,' + image.ImageData)
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }
  eventSource.onerror = () => {
    eventSource.close()
  }
}

const buildQueryString = (query) => {
  const params = new URLSearchParams()

  const queryParameters = {
    Title: query.title,
    IsPaged: query.isPaged,
    Page: query.page,
    PageSize: query.pageSize
  }

  // 属性存在且不为 undefined 时添加参数
  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value)
    }
  })

  // 处理 tags 数组
  if (query.tags && query.tags.length > 0) {
    query.tags.forEach(tag => params.append('tags', tag))
  }

  // 处理 sortOptions 字典
  if (query.sortOptions) {
    Object.entries(query.sortOptions).forEach(([key, value]) => {
      params.append(`SortOptions[${key}]`, value)
    })
  }

  return `https://localhost:7032/api/v1/Image/search?${params.toString()}`
}

const viewImageInfo = function(index) {
  router.push({ name: 'ImageInfo', params: { id: ids.value[index].Id } })
}

const delImage = async function(index) {
  const response = await imageApi.deleteImage(ids.value[index].Id)
  if (response === 200) {
    ElMessage.success('删除成功')
    await refreshImages()
  } else {
    ElMessage.error(`删除失败,${response}`)
  }
}

const showImageUpdate = function(index) {
  if (editChildRef.value) {
    editChildRef.value.openDrawer(ids.value[index].Id)
  }
}

const showButton = function(index) {
  hoverIndex.value = index
}
const hideButton = function() {
  hoverIndex.value = null
}

store.subscribe(async (mutation, state) => {
  if (state.refreshing) {
    await store.dispatch('endRefresh')
    await refreshImages()
  }
})

</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

.thumbnail {
  width: 100%;
  cursor: pointer;
}

.comment-btn {
  position: absolute;
  bottom: 3vh;
  right: 0.9vw;
  padding: 10px 20px;
  background-color: #409EFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.comment-btn:hover {
  background-color: #67bfff;
}

.del-btn {
  position: absolute;
  bottom: 10vh;
  right: 0.9vw;
  padding: 10px 20px;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.del-btn:hover {
  background-color: darkred;
}

.update-btn {
  position: absolute;
  bottom: 17vh;
  right: 0.9vw;
  padding: 10px 20px;
  background-color: sandybrown;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.update-btn:hover {
  background-color: rosybrown;
}

.btn-text {
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.el-col {
  padding-bottom: 1vh;
  position: relative;
}

/* 定义过渡效果 */
.fade-in-up-enter-active,
.fade-in-up-leave-active {
  transition: all 0.3s ease;
}

.fade-in-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}

/* 定义遮罩层样式 */
.overlay {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* 半透明黑色背景 */
  z-index: 1000;
  display: flex;
  justify-content: center;
}
</style>

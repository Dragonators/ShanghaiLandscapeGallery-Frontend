<template>
  <el-container class="image-view">
    <el-aside width="50%" class="image-container">
      <el-image
        :src="image.imageData"
        fit="contain"
        style="width: 100%; height: 100%;"
      ></el-image>
    </el-aside>
    <el-main class="main-content">
      <el-card class="box-card">
        <template v-slot:header>
          <el-row :gutter="0" class="row">
            <el-text size="large" style="font-weight: bold;color: #181818">{{ title }}</el-text>
          </el-row>
          <el-row :gutter="20" class="row">
            <el-col :span="24">
              <el-input
                v-model="newComment"
                type="textarea"
                placeholder="添加新评论"
                rows="3"
              ></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class>
            <el-col :span="3">
              <el-button type="primary" @click="addComment">提交</el-button>
            </el-col>
            <el-col :span="3">
              <el-rate v-model="rating" @change="handleRatingChange" :disabled="isRated" show-score
                       style="margin-bottom: 1vh"></el-rate>
            </el-col>
          </el-row>
          <tag-component v-model="tags" @new-tag="addTag" @del-tag="delTag" style="display: flex"></tag-component>
        </template>
        <el-scrollbar max-height="400px">
          <el-timeline style="max-width: 30vw">
            <el-timeline-item v-for="(comment,index) in comments" :key="index" center
                              :timestamp=comment.createdAt.toString() placement="top">
              <el-card>
                <h4>{{ comment.text }}</h4>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import imageApi from '@/api/image.js'
import TagComponent from '@/components/TagComponent.vue'

const route = useRoute()

const title = ref('')
const image = ref({})
const comments = ref([])
const tags = ref([])
const rating = ref(0)

const newComment = ref('')

const isRated = ref(false)
const fetchImageInfo = async (imageId) => {
  const response = await imageApi.getImageById(imageId)
  response.imageData = `data:image/png;base64,${response.imageData}`
  image.value = response
  response.comments.forEach((comment) => {
    comment.createdAt = new Date(comment.createdAt)
  })
  comments.value = response.comments.sort((a, b) => b.createdAt - a.createdAt)
  tags.value = response.tags.map(({ name }) => name)
  rating.value = response.ratings.length === 0 ? 0 : (response.ratings.reduce((sum, { score }) => sum + score, 0) / response.ratings.length).toFixed(2)
  title.value = response.title
}

onMounted(async () => {
  await fetchImageInfo(route.params.id)
})

const addComment = async () => {
  if (newComment.value.trim()) {
    let newDate = new Date()
    await imageApi.addComment(route.params.id, { createdAt: newDate, text: newComment.value })
    image.value.comments.unshift({ createdAt: newDate, text: newComment.value })
    newComment.value = ''
  }
}
const handleRatingChange = () => {
  isRated.value = true
  imageApi.addRating(route.params.id, { createdAt: new Date(), score: rating.value })
}

const addTag = (tag) => {
  imageApi.addTag(route.params.id, { createdAt: new Date(), name: tag })
}
const delTag = (tag) => {
  imageApi.deleteTag(route.params.id, { createdAt: new Date(), name: tag })
}

</script>

<style scoped>
.row {
  margin-bottom: 1.3vh;
}

.image-view {
  position: fixed;
  top: 7%;
  display: flex;
  width: 100%;
  height: 93%;
}

.image-container {
  padding: 2%;
  position: relative;
  overflow: hidden;
}

.main-content {
  justify-content: center;
  align-items: center;
}

.box-card {
  margin-top: 4vh;
  width: 97%;
  max-height: 80vh;
}
</style>


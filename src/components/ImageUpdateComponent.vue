<script setup>
import { ref } from 'vue'
import imageApi from '@/api/image.js'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const imageId = ref(null)
const drawer = ref(false)

const title = ref('')


const fileList = ref([])
let imageData = ref(null)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const emit = defineEmits(['upDated'])

const handleRemove = () => {
  // console.log(uploadFile, uploadFiles);
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  // console.log(uploadFile.url);
  dialogVisible.value = true
}

const handleExceed = () => {
  ElMessage.warning('只能上传一张图片')
}

const uploadImage = (item) => {
  imageData.value = item.file
}

const submitForm = async () => {
  if (imageData.value == null && title.value === '') {
    ElMessage.error('至少进行一处修改')
    return
  }

  const formData = new FormData()
  formData.append('file', imageData.value)
  formData.append('title', title.value)
  formData.append('lastUpdatedAt', new Date().toISOString())

  const response = await imageApi.updateImage(imageId.value, formData)
  if (response === 200) {
    ElMessage.success('更新成功')
    fileList.value = []
    title.value = ''
    imageData.value = null
    drawer.value = false
    emit('upDated')
  } else {
    ElMessage.error(`更新失败,${response}`)
  }
}

const openDrawer = (index) => {
  drawer.value = true
  imageId.value = index
  fileList.value = []
  title.value = ''
  imageData.value = null
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer v-model="drawer" title="更新图片" size="30%" style="box-shadow:0 4px 8px rgba(0, 0, 0, 0.1)">
    <div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="title" placeholder="请输入新标题"></el-input>
        </el-form-item>
        <el-form-item label="上传新图片">
          <el-upload
            class="upload-demo"
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :http-request="uploadImage"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-button type="primary" class="submit-btn" @click="submitForm">更新到服务器</el-button>
      </el-form>

      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </el-drawer>

</template>
<style scoped>
.submit-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<script setup>
import { onMounted, ref, watch } from 'vue'
import imageApi from '@/api/image.js'
import { useStore } from 'vuex'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(null)

const store = useStore()

onMounted(async () => {
  total.value = await imageApi.getImageCount()
})

watch([currentPage, pageSize], () => {
  // console.log(`currentPage: ${currentPage.value}, pageSize: ${pageSize.value}`);
  store.dispatch('updateImagePage', {
    page: currentPage.value,
    pageSize: pageSize.value
  })
  store.dispatch('beginRefresh')
}, { immediate: true })

</script>

<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    :size="'default'"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    style=""
  />
</template>

<style scoped>
</style>

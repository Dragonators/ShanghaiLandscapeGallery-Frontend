<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const title = ref('')
const order = ref('UpdatedTime')
const tags = ref([])
const orderType = ref(true)

const store = useStore()

const tagInput = ref('')
const _orderType = ref(true)
const advanceSearchVisible = ref(false)

const imageSearch = computed(() => {
  return {
    title: title.value,
    sortOptions: { [order.value]: orderType.value },
    tags: tags.value
  }
})

const onSearch = () => {
  store.dispatch('beginRefresh')
}
const onConfirmAdvance = () => {
  let confirm = tagInput.value.trim().split(/\s+/)
  if (confirm.length > 0 && confirm[0] !== '') tags.value = confirm
  else tags.value = []
  orderType.value = _orderType.value
  advanceSearchVisible.value = false
}
const onCancelAdvance = () => {
  tagInput.value = tags.value.join(' ')
  _orderType.value = orderType.value
  advanceSearchVisible.value = false
}

watch(imageSearch, () => {
  store.dispatch('updateImageSearch', imageSearch.value)
})
</script>

<template>
  <div class="mt-4">
    <el-input
      v-model="title"
      style="max-width: 600px;margin-left: 1vw;margin-right: 1vw"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="order" placeholder="排序方式" style="width: 6vw">
          <el-option label="更新时间" value="UpdatedTime" />
          <el-option label="评分" value="Rating" />
          <el-option label="评论数" value="CommentCount" />
          <el-option label="Tag数" value="TagCount" />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="onSearch" />
      </template>
    </el-input>

    <el-popover :visible="advanceSearchVisible" placement="top" :width="400">


      <el-switch v-model="_orderType"
                 size="large"
                 inline-prompt
                 active-text="正序"
                 inactive-text="倒序">
        <template #active-action>
          <span class="custom-active-action">O</span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">D</span>
        </template>
      </el-switch>

      <el-input v-model="tagInput" placeholder="请输入Tag，以空格隔开">
        <template #prepend>Tags</template>
      </el-input>
      <div style="text-align: right; margin-top: 10px">
        <el-button size="default" text @click="onCancelAdvance">取消</el-button>
        <el-button size="default" type="primary" @click="onConfirmAdvance">
          确定
        </el-button>
      </div>
      <template #reference>
        <el-button type="primary" @click="advanceSearchVisible = true">高级选项</el-button>
      </template>
    </el-popover>

  </div>
</template>

<style scoped>

</style>

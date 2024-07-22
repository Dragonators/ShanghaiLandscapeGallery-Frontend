<template>
  <div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const store = useStore()
const oidcSignInCallback = store.dispatch('oidcStore/oidcSignInCallback');

// 使用 Vue Router
const router = useRouter()

// 在组件挂载时执行操作
onMounted(async () => {
   oidcSignInCallback
    .then((redirectPath) => {
      router.push(redirectPath)
    })
    .catch((err) => {
      console.error(err)
      router.push('/signin-oidc-error') // 处理错误
    })
})
</script>


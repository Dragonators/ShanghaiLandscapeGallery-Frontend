<template>
  <div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const oidcSignInPopupCallback = store.dispatch('oidcStore/oidcSignInPopupCallback');

onMounted(async () => {
  oidcSignInPopupCallback
    .catch((err) => {
      console.error(err) // 处理错误
    })
})
</script>

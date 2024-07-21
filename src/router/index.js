import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from '@/views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GalleryView,
      children: [
        {
          path: 'image/:id',
          name: 'ImageInfo',
          component: () => import('../views/ImageView.vue'),
          props: true
        }
      ]
    }
  ]
})

export default router

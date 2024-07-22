import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from '@/views/GalleryView.vue'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import OidcCallback from '@/oidc/OidcCallback.vue'
import OidcCallbackError from '@/oidc/OidcCallbackError.vue'
import store from '@/store/index.js'
import OidcPopupCallback from '@/oidc/OidcPopupCallback.vue'

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
          props: true,
          meta:{
            isPublic: true
          }
        }
      ],
      meta:{
        isPublic: true
      }
    },
    {
      path: '/oidc-callback', // Needs to match redirectUri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback
    },
    {
      path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallbackError',
      component: OidcCallbackError,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/oidc-popup-callback', // Needs to match popupRedirectUri in you oidcSettings
      name: 'oidcPopupCallback',
      component: OidcPopupCallback
    }
  ]
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store,'oidcStore'));
export default router

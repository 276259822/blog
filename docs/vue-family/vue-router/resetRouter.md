```javascript
import baseRouter from './baseRouter'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRouter
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
```
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import util from '@/api/publicMethods/utils'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = util.getPageTitle(to.meta.title)
    const hasToken = util.getLocalStorageData("token")
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})

/**
 * 数据保存在localStorage的工具模块
 */
import store from 'store'
const USER_KEY = 'user_key'

export default {
    /**
     * 保存（登入）
     * @param {string} user 
     */
    savaUser(user) {
        // localStorage只能存储字符串格式数据，而传入的user是一个对象
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },

    /**
     * 获取（登录状态）
     */
    getUser() {
        // 这里为什么对象是字符串？因为前面的方法需要进行转换成字符串
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    /**
     * 删除（登出）
     */
    removeUser() {
        store.remove(USER_KEY)
    }
}

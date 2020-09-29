/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * @param {string} url 请求地址
 * @param {object} data 请求参数or数据
 * @param {string} method 请求方法
 * @return 返回一个promise对象
 * 1. 优化：统一处理请求异常
 *  在外层包裹一层promise对象
 *  在请求出错时，直接提示错误提示
 * 2. 优化：
 *  异步得到的结果不是 response，而是 response.data
 *  在请求成功的时候，使用resolve(response.data)
 */

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
    // 统一处理请求异常
    // 1. 执行异步请求
    // 2. 成功：调用reslove(value)
    // 3. 失败：不调用reject(reason)，而显示异常
    return new Promise(function (resolve, reject) {
        // promise表示请求状态（是一个promise对象）
        // 1. 发送请求
        let promise
        if (method === 'GET') {
            // params 是一个配置项，无法自定义
            promise = axios.get(url, { params: data })
        } else {
            promise = axios.post(url, data)
        }
        promise
            // 2.成功
            .then(response => {
                // 这里返回给的请求结果包含了data
                resolve(response.data)
            })
            // 3.失败
            .catch(error => {
                // 这个message是antd一个对象，请求了error方法
                // 后面的 error.message 是Promise对象失败之后产生的
                message.error('请求错误了:' + error.message)
            })
    })
}

ajax('/login', { username: 'Tom', password: 'yes' }, 'POST').then()
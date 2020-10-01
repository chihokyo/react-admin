/**
 * 要求：
 * 能根据接口文档定义请求函数
 * 包含应用中所有请求接口的模块
 * @return 返回值都应该是promise对象
 */
import jsonp from 'jsonp'
import ajax from "./ajax";
import { message } from 'antd'
// 登录接口
export const reqLogin = (username, password) => ajax(
    '/login',
    { username, password },
    'POST'
)

// 注册用户接口
// userObj 这里直接就是一个对象，包含了用户名密码电话号码等等信息在内的对象
export const reqAddUser = (userObj) => ajax(
    '/manage/user/add',
    userObj,
    'POST'
)

/**
 * jsonp请求的接口函数
 */

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (er, data) => {
            console.log('jsonp()', er, data)
            if (!er && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                console.log(er)
                message.error('获取天气信息失败')
            }
        })
    })

}
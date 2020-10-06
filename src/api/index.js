/**
 * 要求：
 * 能根据接口文档定义请求函数
 * 包含应用中所有请求接口的模块
 * @return 返回值都应该是promise对象
 */
import jsonp from 'jsonp'
import ajax from "./ajax";
import { message } from 'antd'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登录接口
export const reqLogin = (username, password) => ajax(
    '/login',
    { username, password },
    'POST'
)

// 注册用户接口
// userObj 这里直接就是一个对象，包含了用户名密码电话号码等等信息在内的对象
export const reqAddUser = (userObj) => ajax(
    BASE + '/manage/user/add',
    userObj,
    'POST'
)

/**
 * 关于分类接口
 * @param {function} reqCategorys 获取分类
 * @param {function} reqAddCategory 添加分类
 * @param {function} reqUpdateCategory 更新分类
 */

// 获取分类
export const reqCategorys = (parentId) => ajax(
    BASE + '/manage/category/list',
    { parentId },
)

// 添加分类
// 可以选择2个参数
export const reqAddCategory = (parentId, categoryName) => ajax(
    BASE + '/manage/category/add',
    { parentId, categoryName },
    'POST'
)

// 更新分类
// 也可以选择1个对象包含2个参数
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(
    BASE + '/manage/category/update',
    { categoryId, categoryName },
    'POST'
)

/**
 * 关于商品接口
 * @param {function} reqProducts  获取商品分页列表
 * @param {function} reqSearchProducts  搜索商品分页列表
 */

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(
    BASE + '/manage/product/list',
    { pageNum, pageSize }
)

// 搜索商品分页列表
// 商品名称or商品描述
// SearchType 搜索类型 productName/productDesc
// 本来是区别成2个方法的，但是这个下面这个方法就是把SearchType变成了属性。并且值只能是 productName/productDesc
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(
    BASE + '/manage/product/search',
    {
        pageNum,
        pageSize,
        [searchType]: searchName
    }
)
// // 根据商品描述
// export const reqSearchProducts2 = (pageNum, pageSize, SearchName, SearchType) => ajax(
//     BASE + '/manage/product/search',
//     {
//         pageNum,
//         pageSize,
//         productType: SearchName
//     }
// )

/**
 * jsonp请求的接口函数
 * @param {string} city 
 */

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (er, data) => {
            if (!er && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败')
            }
        })
    })

}
/**
 * 要求：
 * 能根据接口文档定义请求函数
 * 包含应用中所有请求接口的模块
 * @return 返回值都应该是promise对象
 */

import ajax from "./ajax";

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
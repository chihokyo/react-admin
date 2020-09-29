import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

/**
 * 后台路由文件
 */

class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果内存中没有存储 → 未登录
        if (!user || !user._id) {
            // 自动跳转到登录页面【render()里面】
            return <Redirect to='/login'></Redirect>
        }

        return (
            <div>
                <h2>Hello {user.username}</h2>
            </div>
        )
    }
}

export default Admin
import React from 'react'
import './index.less'

/**
 * 链接用按钮
 */

export default function LinkButton(props) {
    // 把组件内所有的属性都传入进来
    return <button {...props} className='link-button'></button>
}

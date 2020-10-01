import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'

import './index.less'
/**
 * 左侧导航组件
 */
class Header extends Component {

    // 状态
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', // 天气图片url
        weather: '', // 天气文本
    }

    // 获取body相应的title
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        // 如果当前item对应的key和目前path的请求地址一样
        // item.title就是当前的title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
                // 在左右的子item里面进行再次查找匹配
            } else if (item.children) {
                const CItem = item.children.find(cItem => cItem.key === path)
                // 如果有值，证明匹配成功
                if (CItem) {
                    title = CItem.title
                }
            }
        })
        return title
    }

    // 每隔1s获取时间
    getTime = () => {
        setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }

    // 获取天气
    getWeather = async () => {
        // 调用接口函数请求数据
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })

    }
    /**
     * 第一次render之后执行一次
     * 一般是异步请求
     * @param {——} props 
     */
    constructor(props) {
        super(props)
        this.getTime()
        this.getWeather()
    }

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript;">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)
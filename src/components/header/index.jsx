import React, { Component } from 'react'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'

import './index.less'
/**
 * 左侧导航组件
 */
export default class Header extends Component {

    // 状态
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', // 天气图片url
        weather: '', // 天气文本
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

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript;">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
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
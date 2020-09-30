import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import logo from '../../assets/images/logo192.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu
/**
 * 左侧导航组件
 */
export default class LeftNav extends Component {

  /**
   * 根据menuList数组生成带有jsx标签的数组
   * 重点 map() + 递归调用
   * @param {Array} menuList 
   */

  getMenuNodeByMap = (menuList) => {
    console.log(menuList)
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={item.title}
          >
            {this.getMenuNodeByMap(item.children)}
          </SubMenu>
        )
      }
    })
  }

  /**
   * 根据menuList数组生成带有jsx标签的数组
   * reduce方法添加
   * @param {Array} menuList 
   */
  getMenuNodeByReduce = (menuList) => {
    // pre 上一次的结果，初始值就是reduce第二个参数，也就是[] 不断向里面添加
    // item 
    return menuList.reduce((pre, item) => {
      // 向pre中添加 <Menu /> or <SubMenu />
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu
            key={item.key}
            title={item.title}
          >
            {this.getMenuNodeByReduce(item.children)}
          </SubMenu>
        ))
      }
      // 这里一定不能忘记
      return pre
    }, [])
  }

  render() {
    return (
      <div to='/' className='left-nav'>
        <Link className='left-nav-header' to='/'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
        >
          {
            // 通过函数，输入一个数组，返回一个jsx标签
            this.getMenuNodeByReduce(menuList)
          }
        </Menu>
      </div>
    )
  }
}
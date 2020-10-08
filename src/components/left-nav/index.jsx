import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import logo from '../../assets/images/logo192.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu
/**
 * 左侧导航组件
 */
class LeftNav extends Component {

  /**
   * 根据menuList数组生成带有jsx标签的数组
   * 重点 map() + 递归调用
   * @param {Array} menuList 
   */

  getMenuNodeByMap = (menuList) => {
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
    // 得到当前路径
    const currentPath = this.props.location.pathname
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
        // 查找一个与当前请求路径匹配的子item
        const chilItem = item.children.find(chilItem => currentPath.indexOf(chilItem.key) === 0)
        if (chilItem) {
          this.openKey = item.key
        }
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
  /**
   * 
   * 在render之前进行执行
   */
  constructor(props) {
    super(props)
    // 先去请求数据
    this.menuNode = this.getMenuNodeByReduce(menuList)

  }

  render() {
    // 取得当前路径
    let currentPath = this.props.location.pathname
    console.log(currentPath.indexOf('/product'))
    // 当前请求的是商品or商品子路由组件
    if (currentPath.indexOf('/product') === 0) {
      currentPath = '/product'
    }

    const openKey = this.openKey
    return (
      <div to='/' className='left-nav'>
        <Link className='left-nav-header' to='/'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[currentPath]}
          defaultOpenKeys={[openKey]}
        >
          {
            // 通过函数，输入一个数组，返回一个jsx标签
            this.menuNode
          }
        </Menu>
      </div>
    )
  }
}

/**
 * withRouter 高阶路由组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递了三个属性 history/location/match
 */
export default withRouter(LeftNav)
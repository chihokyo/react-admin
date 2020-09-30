import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Bar from '../charts/bar'

const { Footer, Sider, Content } = Layout;


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
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: '#fff' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/charts/bar' component={Bar} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'grey' }}>React练习用，谷歌浏览器食用效果更佳</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
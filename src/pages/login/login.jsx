import React, { Component } from 'react'
import './login.less'
import {
  Form,
  Input,
  Button
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/**
 * 登录路由文件
 */

// 必须写在import之后
const Item = Form.Item

class Login extends Component {

  handleSubmit = (e) => {
    alert('hh')
  }

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <h1>React后台管理系统项目练习</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <div>
            <Form
              onSubmit={this.handleSubmit}
              name="normal_login"
              className="login-form"
            >
              <Item>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                />
              </Item>
              <Form.Item>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    )
  }
}

export default Login
import React, { Component } from 'react'
import './login.less'
import {
  Form,
  Input,
  Button
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

/**
 * 登录路由文件
 */

class Login extends Component {

  formRef = React.createRef()

  onFinish = (values) => {
    console.log(values)
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
              name="control-ref"
              className="login-form"
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: '用户名是必填项',
                  },
                  {
                    min: 4,
                    message: '用户名字数不得少于4位',
                  },
                  {
                    max: 12,
                    message: '用户名字数不能多于12位',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名必须是英文数字或者下划线组成'
                  }
                ]}
              >
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
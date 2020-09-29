import React, { Component } from 'react'
import './login.less'
import {
  Form,
  Input,
  Button
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api'
import { message } from 'antd'

/**
 * 登录路由文件
 */

class Login extends Component {
  // 这里只去思考请求成功或者失败的情况，至于登录成功与否这里是无法进行判断
  onFinish = async values => {
    // 请求登录
    const { username, password } = values
    const response = await reqLogin(username, password)
    console.log(response.status)
    if (response.status === 0) {
      // 成功
      message.success('登录成功')
      // 跳转到管理界面
      this.props.history.replace('/')
    } else {
      // 失败
      message.error(response.msg)
    }
  }

  // 自定义验证：password
  validatePwd = (rule, value, callback) => {
    if (!value) {
      return Promise.reject('密码不能为空')
    } else if (value.length < 4 || value.length > 12) {
      return Promise.reject('密码必须大于4位小于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是英文数字或者下划线组成')
    } else {
      return Promise.resolve()
    }
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
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    validator: this.validatePwd
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
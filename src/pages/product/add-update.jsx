import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
const { Item } = Form
const { TextArea } = Input
/**
 * 商品添加Product添加和更新的子路由
 */
export default class ProductAddUpdate extends Component {

  /**
   * 验证价格的自定义函数
   * @param {string} rule Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据
   * @param {string} value 表示输入的值
   * @param {function} callback  验证通过回调函数
   */
  validatePrice = (rule, value) => {
    console.log(rule)
    // console.log(value, typeof value)
    // 检查一下数字是否大于0
    if (value * 1 > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('商品价格必须大于0')
    }
  }

  render() {
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: '10px', color: 'green' }}
          />
          <span>添加商品</span>
        </LinkButton>
      </span>
    )
    // 指定item布局的配置对象
    const layout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 8,
      },
    }

    const onFinish = values => {
      console.log('Success:', values);
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }

    return (
      <Card title={title}>
        <Form
          {...layout}
          name="addProductForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Item label="商品名称" name="pname" rules={[{ required: true, message: '商品名称必须输入' }]}>
            <Input placeholder="商品名称" ></Input>
          </Item>
          <Item label="商品描述" name="pdesc" rules={[{ required: true, message: '商品描述必须输入' }]}>
            <Input.TextArea placeholder="请输入商品描述" autoSize />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: '商品价格必须输入' },
              { validator: this.validatePrice }
            ]}>
            <Input placeholder="请输入商品价格" addonAfter="元"></Input>
          </Item>
          <Item label="商品分类" name="pcategory">
            <Input placeholder="商品分类" ></Input>
          </Item>
          <Item label="商品图片" name="pimg">
            <Input placeholder="商品图片" ></Input>
          </Item>
          <Item label="商品详情" name="pdetail">
            <Input placeholder="商品详情" ></Input>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">确认添加</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
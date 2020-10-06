import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
/**
 * 商品Home路由
 */
export default class ProductHome extends Component {
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品数组
    loading: false // 加载状态
  }

  /**
   * 获取指定页码的列表数据显示
   * @param {number} pageNum 
   */
  getProducts = async (pageNum) => {
    // 加载loading效果
    this.setState({
      loading: true
    })
    // 发送请求获取数据
    const result = await reqProducts(pageNum, PAGE_SIZE)
    // 关闭loading效果
    this.setState({
      loading: false
    })
    // 判断请求状态
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    } else {
      message.error('获取数据出错')
    }
  }

  componentDidMount() {
    this.getProducts(1)
  }

  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: 'name',
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "¥" + price //传入对应属性值
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: "操作",
        dataIndex: "status",
        render: (products) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  constructor(props) {
    super(props)
    this.initColumns()
  }

  render() {
    const { products, total, loading } = this.state

    const title = (
      <span>
        <Select defaultValue="1" style={{ width: 130 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="keyword" style={{ width: 200, margin: "0 15px" }} />
        <Button type="primary">搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary">
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total: total,
            showQuickJumper: true,
            // onChange: (pageNum) => {
            //   this.getProducts(pageNum)
            // }
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
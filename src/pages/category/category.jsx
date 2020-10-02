import React, { Component } from 'react'
import {
  Card,
  Button,
  Table, message
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api/'
/**
 * 商品分类路由
 */
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据
    categorys: [], // 1级分类列表
  }

  /**
   * 初始化table所有列数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name', // 数据对应的属性名 ↑数据的name
      },
      {
        title: '操作',
        width: 300,
        dataIndex: 'age',
        // 指定需要返回的页面标签
        render: () => (
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ]
  }

  /**
   * 获取1级分类列表
   */
  getCategorys = async () => {
    // 请求前loading
    this.setState({ loading: true })
    const result = await reqCategorys('0')
    this.setState({ loading: false })
    if (result.status === '0') {
      const categorys = result.data
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类列表失败')
    }
  }

  // 初始化列表数据
  constructor(props) {
    super(props)
    this.initColumns()
  }

  // 异步ajax请求获取列表信息
  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { categorys, loading } = this.state
    // card标题
    const title = '一级分类'
    const extra = (
      <Button type="primary">
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered={true}
            rowKey='_id'
            loading={loading}
            dataSource={categorys}
            columns={this.columns}
            pagination={{ defaultPageSize: 10, showQuickJumper: true }}
          />
        </Card>
      </div>
    )
  }
}
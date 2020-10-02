import React, { Component } from 'react'
import {
  Card,
  Button,
  Table
} from 'antd'
import LinkButton from '../../components/link-button'

/**
 * 商品分类路由
 */
export default class Category extends Component {
  render() {
    // card标题
    const title = '一级分类'
    const extra = (
      <Button type="primary">
        添加
      </Button>
    )
    const dataSource = [
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f352726338607047",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3",
        "__v": 0
      }
    ]

    const columns = [
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
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered={true}
            rowKey='_id'
            dataSource={dataSource}
            columns={columns}
          />
        </Card>
      </div>
    )
  }
}
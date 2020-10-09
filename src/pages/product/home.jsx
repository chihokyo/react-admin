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
import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
/**
 * 商品Home路由
 */
export default class ProductHome extends Component {
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品数组
    loading: false, // 加载状态
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 搜索的类型【根据哪个字段思索】productName
  }

  /**
   * 获取指定页码的列表数据显示
   * @param {number} pageNum 
   */
  getProducts = async (pageNum) => {
    // 为了记录下当前的页数，记录成全局
    this.pageNum = pageNum
    // 加载loading效果
    this.setState({
      loading: true
    })

    // 根据请求（搜索or一般分页）类型获取数据
    const { searchName, searchType } = this.state

    // 统一进行存储结果
    let result
    // a:搜索
    if (searchName) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })

    } else {
      // b:一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
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
  // 更新指定商品的状态
  updateProductStatus = async (productId, status) => {
    const result = await reqUpdateProductStatus(productId, status)
    if (result.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  componentDidMount() {
    this.getProducts(1)
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '状态',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateProductStatus(_id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  constructor(props) {
    super(props)
    this.initColumns()
  }

  render() {
    const { products, total, loading, searchType, searchName } = this.state
    const title = (
      <span>
        <Select
          defaultValue={searchType}
          style={{ width: 130 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="keyword"
          style={{ width: 200, margin: "0 15px" }}
          value={searchName}
          onChange={e => this.setState({
            searchName: e.target.value
          })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
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
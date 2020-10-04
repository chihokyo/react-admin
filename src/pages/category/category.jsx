import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal
} from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api/'
import AddForm from './add-form'
import UpdateForm from './update-form'

/**
 * 商品分类路由
 */
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据
    categorys: [], // 1级分类列表
    parentId: '0', // 当前显示的父类列表ID
    parentName: '', // 当前显示的父类列表title
    subCategorys: [], // 2级分类列表
    showModalStatus: 0 // 新增or更新列表的对话框状态 【0：都不显示 1：显示新增 2：显示更新】
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
        // 指定需要返回的页面标签
        render: (categorys) => (
          <span>
            <LinkButton onClick={() => this.showUpdateModal(categorys)}>修改分类</LinkButton>
            {/* 下面是错误的，因为初始化的时候不能调用onclick，这样就会直接执行了
            而需要在触发事件进行调用的话。外面就需要在进行包裹一层函数 */}
            {/* <LinkButton onClick={ this.showSubCategorys(category)}>查看子分类</LinkButton> */}
            {/* 如何向事件回调函数进行传递参数，先定义一个回调函数，里面在定义一个函数传入数据 */}
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(categorys)}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ]
  }

  /**
   * 获取1级or2级分类列表
   */
  getCategorys = async () => {
    // 请求前loading
    this.setState({ loading: true })
    // 获取此时列表id
    const { parentId } = this.state
    // 获取1级or2级列表数据
    const result = await reqCategorys(parentId)
    this.setState({ loading: false })
    // 判断请求是否成功
    // 成功
    if (result.status === 0) {
      const categorys = result.data
      // 判断结果是1级列表or2级列表
      // 1级
      if (parentId === '0') {
        this.setState({
          categorys
        })
        // 2级
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
      // 失败
    } else {
      message.error('获取分类列表失败')
    }
  }

  /**
   * 获取指定1级列表的孩子们2级子列表
   * @param {string} category 
   */
  showSubCategorys = (category) => {
    // 先更新 parentId 状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      // console.log(this.state.parentId)
      // 这里必须要写在闭包函数里！！！
      // 因为setState()不能立即获取最新的状态，他是异步更新状态
      // 获取2级分类
      this.getCategorys()
    })
    // console.log(this.state.parentId)
  }

  /**
   * 显示1级分类列表
   */
  showMainCategorys = () => {
    // 本质就是更新为显示1级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  /**
   * 显示新增分类对话框
   */
  showAddModal = () => {
    this.setState({
      showModalStatus: 1
    })
  }

  /**
   * 显示修改分类对话框
   */
  showUpdateModal = (categorys) => {
    // 保存分类对象
    this.category = categorys
    this.setState({
      showModalStatus: 2
    })
  }

  /**
   * 新增分类
   */
  addCategory = () => {
    console.log('addCategory()');
  }

  /**
   * 更新分类
   */
  updateCategory = () => {
    console.log('updateCategory()')

  }

  /**
   * 响应点击取消隐藏对话框
   * 本质→ 修改对话框状态（关闭）
   */
  handleCancel = () => {
    this.setState({
      showModalStatus: 0
    })
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
    const {
      categorys,
      loading,
      subCategorys,
      parentId,
      parentName,
      showModalStatus
    } = this.state
    // 读取指定的分类(默认一个空对象)
    const category = this.category || {}

    // card标题
    const title = parentId === '0' ? '1级分类列表' : (
      <span>
        <LinkButton onClick={this.showMainCategorys}>1级分类列表</LinkButton>
        <ArrowRightOutlined />
        <span style={{ marginLeft: '10px' }} >{parentName}</span>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={this.showAddModal}>
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
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            pagination={{ defaultPageSize: 10, showQuickJumper: true }}
          />
        </Card>

        <Modal
          title="新增分类"
          visible={showModalStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm ></AddForm>
        </Modal>

        <Modal
          title="修改分类"
          visible={showModalStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <UpdateForm categoryName={category.name}></UpdateForm>
        </Modal>
      </div>
    )
  }

}
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
import { reqCategorys, reqCategoryById } from '../../api'
const { Item } = Form
const { TextArea } = Input
/**
 * 商品添加Product添加和更新的子路由
 */


export default class ProductAddUpdate extends Component {

  state = {
    options: [], // 分类状态数组
  }

  /**
   * 获取1级or2级分类列表
   * async的返回值是一个新的promise对象，它的结果是根据async函数的结果来定
   * @param {string} parentId 
   */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)

    // 表示获取成功
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        // 1级
        this.initOptions(categorys)
      } else {
        // 2级
        return categorys // 2级列表 → async promise 成功且value就是 categorys

      }
    }
  }


  /**
   * 初始化商品分类列表
   * @param {object} categorys 数组
   */
  initOptions = async (categorys) => {
    // 根据 categorys 生成 options 数组
    const options = categorys.map(c => (
      {
        value: c._id,
        label: c.name,
        isLeaf: false,
      }
    ))
    // 如果是一个2级分类更新
    const { isUpdate, product } = this
    const { pCategoryId } = product
    let childOptions
    if (isUpdate && pCategoryId !== '0') {
      // 获取2级列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成2级下拉列表
      childOptions = subCategorys.map(c => (
        {
          value: c._id,
          label: c.name,
          isLeaf: true,
        }
      ))
    }
    const targetOption = options.find(option => option.value === pCategoryId)
    targetOption.children = childOptions
    // 更新 options 状态
    this.setState({
      options
    })
  }

  /**
   * 验证价格的自定义函数
   * @param {string} rule Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据
   * @param {string} value 表示输入的值
   * @param {function} callback  验证通过回调函数
   */
  validatePrice = (rule, value) => {
    // console.log(value, typeof value)
    // 检查一下数字是否大于0
    if (value * 1 > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('商品价格必须大于0')
    }
  }

  /**
   * 点击列表触发事件 loadData
   * loadData回调函数表示加载成功后获取下一级数据
   * @param {object} selectedOptions 下一级数据
   */
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0];
    // 是否显示loading效果
    targetOption.loading = true
    // 这里的value就是下一级分类的父id
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) {
      // 生成一个2级列表
      const childOptions = subCategorys.map(c => (
        {
          value: c._id,
          label: c.name,
          isLeaf: true,
        }
      ))
      targetOption.children = childOptions
    } else {
      // 没有2级分类
      targetOption.isLeaf = true
    }

  }

  componentDidMount() {
    this.getCategorys('0')
  }

  constructor(props) {
    super(props)
    // 添加没，更新有值
    const product = this.props.location.state
    // 强制转换成布尔类型！！
    this.isUpdate = !!product
    // 没有值就是空对象，这样就可以取出避免报错
    this.product = product || {}
  }
  
  render() {
    const { isUpdate, product } = this
    const { categoryId, pCategoryId } = product

    // 接收级联分类ID数据的数组
    const categoryIdArray = []
    if (isUpdate) {
      // 开始进行1级2级列表进行区分。塞入数组
      if (pCategoryId === '0') {
        categoryIdArray.push(categoryId)
      } else {
        categoryIdArray.push(categoryId)
        categoryIdArray.push(pCategoryId)
      }
    }

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: '10px', color: 'green' }}
            onClick={() => this.props.history.goBack()}
          />
          <span>{isUpdate ? '修改商品' : '添加商品'}</span>
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
          initialValues={{
            pname: product.name,
            pdesc: product.desc,
            price: product.price,
            pcategory: categoryIdArray,
          }}
        >
          <Item label="商品名称" name="pname" rules={[{ required: true, message: '商品名称必须输入' }]}>
            <Input placeholder="商品名称" ></Input>
          </Item>
          <Item label="商品描述" name="pdesc" rules={[{ required: true, message: '商品描述必须输入' }]}>
            <TextArea placeholder="请输入商品描述" autoSize />
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
          <Item label="商品分类" name="pcategory" rules={[{ required: true, message: '商品分类必须选择' }]}>
            <Cascader
              placeholder='请选择商品分类'
              options={this.state.options} /** 需要显示的分类列表数组 */
              loadData={this.loadData}  /** 选择某个分类列表之后加载下一级列表监听回调函数 */
              onChange={this.onChange}
              changeOnSelect
            />
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
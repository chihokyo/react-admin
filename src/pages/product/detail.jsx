import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategoryById } from '../../api'
const Item = List.Item

/**
 * 商品详情页子路由
 */
export default class ProductDetail extends Component {

  state = {
    cName1: '',
    cName2: '',
  }

  async componentDidMount() {
    console.log(this.props.location.state.product)

    const { pCategoryId, categoryId } = this.props.location.state.product
    if (pCategoryId === '0') {
      // 只有一个分类
      const result = await reqCategoryById(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })

    } else {
      //2个分类
      // // 方法1：这里是通过await方式发送多个请求。后面一个请求是在前一个请求发送之后获得
      // const result1 = await reqCategoryById(pCategoryId)
      // const result2 = await reqCategoryById(categoryId)
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name

      // 方法2：一次性发送多个请求，只有都成功了。才进行处理。结果是一个数组。
      const results = await Promise.all([reqCategoryById(pCategoryId), reqCategoryById(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name

      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state.product
    const { cName1, cName2 } = this.state
    console.log(imgs)
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: '10px', color: 'green' }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类</span>
            <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片</span>
            {
              imgs.map(img => (
                <img
                  key={img}
                  src={BASE_IMG_URL + img}
                  className="product-img"
                  alt="img"
                />
              ))
            }
          </Item>
          <Item>
            <span className="left">商品详情</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
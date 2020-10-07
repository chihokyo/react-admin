import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
const Item = List.Item

/**
 * 商品详情页子路由
 */
export default class ProductDetail extends Component {
  render() {
    console.log(this.props.location.state.p)
    const { name, desc, price, detail, imgs } = this.props.location.state.product
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
            <span>联想电脑联想电脑联想电脑联想电脑联想电脑</span>
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
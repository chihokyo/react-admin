import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'
const Item = List.Item

/**
 * 商品详情页子路由
 */
export default class ProductDetail extends Component {
  render() {

    const title = (
      <span>
        <span>商品详情</span>
      </span>
    )

    return (
      <div>
        <Card title={title} className="product-detail">
          <List>
            <Item>
              <span className="left">商品名称：</span>
              <span>联想电脑</span>
            </Item>
            <Item>
              <span className="left">商品名称：</span>
              <span>联想电脑联想电脑联想电脑联想电脑联想电脑</span>
            </Item>
            <Item>
              <span className="left">商品价格：</span>
              <span>11111</span>
            </Item>
            <Item>
              <span className="left">所属分类</span>
              <span>联想电脑联想电脑联想电脑联想电脑联想电脑</span>
            </Item>
            <Item>
              <span className="left">商品图片</span>
              <img src="http://localhost:3000/upload/image-1554636776678.jpg" alt="img" />
              <img src="http://localhost:3000/upload/image-1554636776678.jpg" alt="img" />
              <img src="" alt="" />
            </Item>
            <Item>
              <span className="left">商品详情</span>
              <span dangerouslySetInnerHTML={{ __html: '<h1>联商品详情商品详情商品详情商品详情</h1>' }}></span>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}
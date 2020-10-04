import React, { Component } from 'react'
import {
    Form,
    Input
} from 'antd'
const Item = Form.Item

/**
 * 更新分类的Form组件
 */

export default class UpdateForm extends Component {

    render() {
        const { categoryName } = this.props
        return (
            <Form
                initialValues={{
                    categoryTitle: categoryName
                }}
            >
                <Item name="categoryTitle">
                    <Input placeholder="请输入分类名称" />
                </Item>
            </Form>
        )
    }
}
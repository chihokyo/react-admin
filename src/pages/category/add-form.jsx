import React, { Component } from 'react'
import {
    Form,
    Select,
    Input
} from 'antd'
const Item = Form.Item
const Option = Select.Option

/**
 * 新增分类的Form组件
 */

export default class AddForm extends Component {
    render() {
        return (
            <Form
                initialValues={{
                    categorys: '0',
                    categoryTitle: ''
                }}
            >
                <Item>
                    <Select name="categorys" value='0'>
                        <Option value="0">1级</Option>
                        <Option value="1">2级</Option>
                        <Option value="2">3级</Option>
                    </Select>
                </Item>
                <Item name="categoryTitle">
                    <Input placeholder="请输入分类名称" />
                </Item>
            </Form>
        )
    }
}
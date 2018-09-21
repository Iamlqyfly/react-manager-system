import React from 'react';
import { Card, Table, Modal, Button, message, Divider} from 'antd';
import axios from './../../axios/index'
// import axios from 'axios'
import Utils from './../../utils/utils';
export default class BasicTable extends React.Component{
    state = {
        dataSource2: []
    }
    params = {
        page:1
    }
    componentDidMount() {
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item, index) => {
          item.key = index
        })
        this.setState({
            dataSource: data
        })
        this.request()
    }
    // 动态获取mock数据  这样写法每次度需要引入baseurl 可以把请求后端数据接口封装
    // request = () => {
    //     let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    //     axios.get(baseUrl + '/table/list').then( res => {
    //         res.data.result.list.map((item,index) => {
    //             item.key = index
    //         })
             
    //         if (res.status == '200' && res.data.code == 0) {
    //             this.setState({
    //                 dataSource2: res.data.result.list
    //             })
    //         }
    //     })
    // }
    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current
                        this.request()
                    })
                })
            }
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index]
        Modal.info({
            title: '信息',
            content: `用户名:${record.userName},用户爱好:${record.interest}`
        })
        this.setState({
            selectedItem: record,
            selectedRowKeys: selectKey,
            // 当前选中一行的索引
        })
    }
    //多行执行删除操作
    handleDelete = ( ()=> {
        debugger
        let rows = this.state.selectedRows
        console.log(rows)
        let ids = []
        rows.map((item) => {
            ids.push(item.id)
        })
        
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗?${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功')
                this.request()
            }
        })
    })
    render() {
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'吃',
                        '2':'睡',
                        '3':'玩',
                        '4':'趟',
                        '5':'糖'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '睡觉',
                        '3': '发呆',
                        '4': '跑步',
                        '5': '阅读',
                        '6': '电影',
                        '7': '桌球',
                        '8': '手绘'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys 
            // 指定选中项的 key 数组，需要和 onChange 进行配合
        }
        const rowAllSelection = {
            type: 'checkbox',
            selectedRowKeys,
            // 指定选中项的 key 数组，需要和 onChange 进行配合
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                   <Table  bordered dataSource={this.state.dataSource} columns={columns} pagination={false}/>
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
                  <Table  bordered dataSource={this.state.dataSource2} columns={columns} pagination={false}/>
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowAllSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>     
            </div>
        )
    }
}
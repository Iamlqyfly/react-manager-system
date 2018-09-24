import React from 'react'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal, Divider, Checkbox} from 'antd'
import axios from '../../axios/index'
import ETable from '../../components/ETable/index'
import menuConfig from '../../config/menuConfig'
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
export default class Permisson extends React.Component{
    state = {}
    componentDidMount() {
        this.requestList()
    }
    requestList = ()=>{
        axios.ajax({
            url:'/role/list',
            data:{
                params:{}
            }
        }).then((res)=>{
            if(res.code == 0){
                let list  = res.result.item_list.map((item,i)=>{
                    item.key = i;
                    return item;
                })
                this.setState({
                    list
                })
            }
        })
    }
     // 角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible: true
        })
    }
    //  角色提交
    handleRoleSubmit() {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'role/create',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isRoleVisible:false
                })
                this.requestList();
            }
        })
    }
    handlePermission = ()=>{
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem
        }) 
        let menuList = this.state.selectedItem.menus
        this.setState({
            menuInfo: menuList
        })
    }
    handlePermEditSubmit = ()=> {
        let data = this.roleForm.props.form.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.menus = this.state.menuInfo
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPermVisible:false
                })
                this.requestList();
            }
        })
    }
    handleUserAuth = ()=>{
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        })
    }
    handleUserSubmit = ()=> {

    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ]
        return (
            <div>
                <Card>
                   <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                   <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                   <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                   <ETable
                        dataSource={this.state.list}
                        columns={columns} 
                   />
                </div>
                <Modal
                  title="创建角色"
                  visible={this.state.isRoleVisible}
                  onOk={this.handleRoleSubmit} 
                  onCancel={()=>{
                    this.roleForm.props.form.resetFields()
                    this.setState({
                        isRoleVisible:false
                    })
                }}
                >   
                  <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>  
                <Modal
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=> {
                        this.setState({
                           isPermVisible: false
                        })
                   }}>
                    <PermEditForm
                        wrappedComponentRef={(inst) => this.roleForm = inst }
                        // detailInfo={this.state.detailInfo}
                        // menuInfo={this.state.menuInfo||[]}
                        // patchMenuInfo={(checkedKeys)=>{
                        //     this.setState({
                        //         menuInfo: checkedKeys
                        //     });
                        // }}
                    />
               </Modal>  
                <Modal
                       title="用户授权"
                       visible={this.state.isUserVisible}
                       width={800}
                       onOk={this.handleUserSubmit}
                       onCancel={()=>{
                           this.setState({
                               isUserVisible:false
                           })
                       }}>
                </Modal>
           </div>  
        )
    }
}
// 角色创建
class RoleForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermEditForm extends React.Component {
    state = {}
    onCheck = (checkedKeys) => {
        
    }
    renderTreeNodes = (data, key='') => {
        return data.map(item => {
            let parentKey = key + item.key
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree"> 
                       {this.renderTreeNodes(item.children, parentKey)} 
                    </TreeNode>
                )
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree"> 
                        {this.renderTreeNodes(item.children, parentKey)} 
                    </TreeNode>
                )
            }
            return <TreeNode {...item} />
        })
    }
    
    renderBtnTreeNode = (menu, parentKey='') => {
        const btnTreeNode = []
        menu.btnList.forEach(item=> {
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"></TreeNode>)
        })
        return btnTreeNode
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        // const detail_info = this.props.detailInfo;
        // const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength="8" placeholder=""/>
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80}}
                                placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>    
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)

// 用户授权
class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        // return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys) => {
        // this.props.patchUserInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        // const detail_info = this.props.detailInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder=""/>
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200,height: 400}}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
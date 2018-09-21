import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox, Divider } from "antd";
const FormItem = Form.Item;
class FormLogin extends React.Component{
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
              
          }
        })  
    }
    render() {
        const { getFieldDecorator, isFieldTouched} = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem validateStatus={userNameError ? 'error': ''}>
                            { getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem validateStatus={passwordError ? 'error': ''}>
                            { getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your username!'}]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="password" />
                            )}
                        </FormItem>
                        <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit">
                                    Log in
                                </Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style ={{ marginTop: 10}}>
                    <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: 300 }}>
                        <FormItem >
                           <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                           <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin);

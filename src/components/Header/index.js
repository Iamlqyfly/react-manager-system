import React from 'react'
import { Row,Col,Modal} from "antd"
import './index.less'
import Util from '../../utils/utils'
import Store from '../../utils/store'
import axios from '../../axios'
import { connect } from 'react-redux'
const confirm = Modal.confirm;
class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:'iamlqy'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    
    logout =() => {
        confirm({
            title: '是否确定退出系统?',
            onOk() {
                Store.save("username", "");
                // Utils.clearUid();
                window.location.href = '/#/login';
            },
        })    
    }
    getWeatherAPIData(){
        let city = '深圳';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl, // 白天的天气图片
                    weather:data.weather
                })
            }
        })
    }
    render(){
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    { //menuType 为true、加载二级导航 没有为空、因为首页没有这个menuType
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span> React Manager System</span>
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a onClick={this.logout}>退出</a>
                    </Col>
                </Row>
                
                { // 一级导航和二级导航
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)
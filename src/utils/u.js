import {Modal,Select,Icon} from 'antd'
import React from 'react'
import Store from '../utils/Store'
const Option = Select.Option;

let UtilFun = {
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else
            return null;
    },
    setCookie(name, value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
    },
    clearUid(){
        let date = new Date();
        date.setTime(date.getTime()-24*60*60*60);
        document.cookie = 'Server-Token=;domain=songguo7.com;expires='+date.toGMTString();
    },
    ui: {
        //alert封装
        alert(options) {
            const callback = options.callback;
            options = Object.assign({}, {
                title: '温馨提示',
                iconType: 'exclamation-circle',
                width: 320,
                content: (
                    <div>{options.text}</div>
                ),
                okText: '关闭'
            }, options);
            const info = Modal.info(options)
        },
        //confirm封装
        confirm(options) {
            options = Object.assign({}, {
                title: '',
                width: 320,
                content: (
                    <div style={{textAlign:'center'}}>
                        {options.text}
                        {
                            options.desc ? <p>{options.desc}</p> : ''
                        }
                    </div>
                ),
                okText: '确定'
            }, options);
            Modal.confirm(options)
        }
    },
    //统计字节长度
    countByteLength(str){
        var byteLen = 0;
        for (var i = 0; i < str.length; i++) {
            if (/[\x00-\xff]/g.test(str.charAt(i))) {
                byteLen += 1;
            } else {
                byteLen += 2;
            }
        }
        return byteLen;
    },
    fixAmount(text) {
        return (text / 100).toFixed(2)
    },
    fixEmptyRichText(value) {
        if (/img|video/i.test(value)) {
            return value
        }
        if (value.replace(/<[^>]+>|&nbsp;|\s+/g, '') == '') {
            return ''
        }
        return value
    },
    fixNum(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num.toString();
    },
    // 格式化日期(eg:2017-10-08 15:00:00)
    formatTime(timestamp) {
        if (!timestamp) {
            return '';
        }

        var date = new Date(+timestamp);
        return [
                date.getFullYear(),
                UtilFun.fixNum(date.getMonth() + 1),
                UtilFun.fixNum(date.getDate())
            ].join('-') + ' ' + [
                UtilFun.fixNum(date.getHours()),
                UtilFun.fixNum(date.getMinutes()),
                UtilFun.fixNum(date.getSeconds())
            ].join(':')
    },
    // 格式化时间(eg:1小时15分钟20秒)
    formatDuration(timestamp) {
        if (!timestamp) {
            return '';
        }
        return parseInt(timestamp / 60 / 60) + "小时" + parseInt(timestamp / 60 % 60) + "分钟" + parseInt(timestamp % 60 % 60) + "秒"
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        if (typeof suffix != "string") {
            suffix = ""
        }
        fee = Math.floor(fee) / 100;
        var s = fee.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    /*
     * 分页代码封装
     * @useage:
     * Utils.pagination(data,(current)=>{
     *    this.params.page = current;
     *    this.requestList()
     * })
     * */
    pagination(data, callback){
        var page = {
            onChange: (current) => {
                callback && callback(current);
            }
        };
        page.current = data.result.page;
        page.pageSize = data.result.page_size;
        page.total = data.result.total_count;
        page.showTotal = () => {
            return '共' + data.result.total_count + '条 '
        };
        page.showQuickJumper = true;
        return page;
    },
    // 获取开通城市列表
    getCityList(delAll){
        let data = { 1:'北京',2: '上海',3:'天津',4:'杭州'};
        if (!data) {
            return [];
        }
        var city_options = [<Option value="" key="all">全部</Option>];
        for (var key in data) {
            var option = <Option value={key + ""} key={key}>{data[key]}</Option>;
            city_options.push(option);
        }
        //是否删除全部选项，true:删除，默认显示
        delAll ? city_options.splice(0, 1) : '';
        return city_options;
    },
    // 根据data生成Option List
    getOptionList(data, isDelAll){
        if (!data) {
            return [];
        }
        var city_options = [<Option value="" key="d_all">全部</Option>];
        data.map((item)=> {
            var option = <Option value={item.id} key={item.id}>{item.name}</Option>;
            city_options.push(option);
        });
        //是否删除全部选项，true:删除，默认显示
        isDelAll ? city_options.splice(0, 1) : '';
        return city_options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds){
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
    // 获取默认城市ID
    getDefCity(){
        return Store.fetch("defaultCity") || ''
    },
    // 当前页面权限按钮过滤
    filterBtnKeys(btnKeys){
        if (!btnKeys) {
            return {}
        } else if (!btnKeys.filter) {
            return {}
        } else {
            const router_key = window.location.hash.split("#")[1];
            //过滤当前页面按钮的权限
            return btnKeys.filter((item)=> {
                if (item.indexOf(router_key) > -1) {
                    return item
                }
            });
        }
    },
    // 判断按钮是否有权限
    checkBtnPerm(btnKeysList, btnIndex, routerKey){
        const router_key = routerKey || window.location.hash.split("#")[1];
        if (btnKeysList && btnKeysList.indexOf) {
            return btnKeysList.indexOf(router_key + '-btn' + btnIndex) > -1 || btnKeysList.indexOf('#' + router_key + '-btn' + btnIndex) > -1;
        }
    },
    // 跳转到订单详情
    goToOrderDetail(orderId){
        var url = "/#/common/order/detail/" + orderId;
        window.open(url, "_blank");
    },
    setMapScrollZoom(_this,isTrue){
        if(!isTrue){
            _this.map.enableScrollWheelZoom()
        }else {
            _this.map.disableScrollWheelZoom();
        }
        _this.isTrue = !isTrue;
    }
}; 
export default UtilFun;


// WEBPACK FOOTER //
// ./src/utils/Util.js
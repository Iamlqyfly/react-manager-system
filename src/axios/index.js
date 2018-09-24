import JsonP from 'jsonp'
import axios from 'axios'
import Utils from '../utils/utils'
import { Modal } from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    //ajax 封装
    static ajax(options) {
        let loading
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
        return new Promise((resolve,reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') { // http请求返回成功状态码
                    let res = response.data
                    if (res.code == '0') { // 业务请求返回状态
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
    static requestList(_this,url,params,isMock){
        var data = {
            params: params,
            isMock
        };
        this.ajax({
            url,
            data
        }).then(data =>{
            if (data) {
                if (data.result && data.result.item_list) {
                    // message.success('请求列表成功!');
                    debugger
                    let list = data.result.item_list.map(function (item,index) {
                        item.key = index;
                        return item
                    })
                    _this.setState({
                        list,
                        pagination: Utils.pagination(data,(current)=>{
                            _this.params.page = current;
                            _this.requestList()
                        }),
                        selectedRowKeys: [],
                        selectedItem:'',
                        selectedIds:''
                    })
                }
            } else {
                alert("请求失败");
            }
        })
    }
}
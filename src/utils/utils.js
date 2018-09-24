import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
              return `共${data.result.total_count}条`
            },
            showQuickJumper: true
        }
    },
     // 获取开通城市列表
     getCityList(delAll){
        let data = { 1:'北京',2: '上海',3:'天津',4:'杭州'};
        if (!data) {
            return [];
        }
        var city_options = [<Option value="" key="all">全部</Option>]
        for (var key in data) {
            var option = <Option value={key + ""} key={key}>{data[key]}</Option>
            city_options.push(option)
        }
        //是否删除全部选项，true:删除，默认显示
        delAll ? city_options.splice(0, 1) : ''
        return city_options
    },
    // 根据data生成Option List
    getOptionList(data) {
        if(!data) {
           return []
        }
        let options = []  //[<Option value="0" key="all_key">全部</Option>]
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
     /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if(selectedIds) {
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
}
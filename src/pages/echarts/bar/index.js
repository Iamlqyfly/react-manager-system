import React from 'react'
import { Card } from 'antd'
// import ReactEcharts from 'echarts-for-react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
// 引入 ECharts 主模块  按需加载模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Bar extends React.Component {
    state = {}
    componentWillMount() {

    }
    getOption() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: { type: 'value'},
            series: [{
                name: '订单量',
                type: 'bar',
                data: [  // 对应着y轴的值
                    1000,
                    2000,
                    1500,
                    4000,
                    2000,
                    1200,
                    800
                ]
            }]
        }
        return option
    }

    getOption2(){
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [
                        2000,
                        3000,
                        5500,
                        7000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [
                        1500,
                        3000,
                        4500,
                        6000,
                        8000,
                        10000,
                        15000
                    ]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        2500,
                        4000,
                        6000,
                        7000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }
    getOption3() {

    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"} />
                </Card>
                <Card title="柱形图表之二">
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption2()}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"} />
                </Card>
                {/* <Card title="柱形图表之三">
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.getOption3()}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"} />
                </Card> */}
               

            </div>
        )
    }
}
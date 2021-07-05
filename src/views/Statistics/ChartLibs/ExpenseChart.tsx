import getData from "common/getData";
import React from "react";
import useRecords from "../../../hooks/useRecords";
import useTags from "../../../hooks/useTags";
import {WrapperChart} from "../../../components/WrapperChart";
import {ShowMoney} from "../../../components/ShowMoney";
import ReactEcharts from "echarts-for-react";


const ExpenseChart:React.FC = () => {
    const {expenseAll, expense} = useRecords()
    const {getName} = useTags()
    const chartData = getData( expense,getName)
    const keys = chartData.map(item => item.name)
    const getOption = () => {
        return  {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} 元 ({d}%)'
            },
            legend: {

                top: '5%',
                left: 'center',
                data: keys
            },
            series: [
                {
                    name:'金额',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: chartData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    return (
        <WrapperChart>
            <ShowMoney>
                <span className={'title'}>总支出: ￥{expenseAll} 元</span>
                <span className={'count'}>共{keys.length}类支出项目</span>
            </ShowMoney>
            <ReactEcharts option={getOption()}
                          lazyUpdate={false}/>
        </WrapperChart>
    )
}

export default ExpenseChart
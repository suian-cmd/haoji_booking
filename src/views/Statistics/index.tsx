import React, {useState} from "react";
import {Layout} from "../../components/Layout";
import CategorySection from "../Home/Money/section/CategorySection";
import {TypeSection} from "../../components/TypeSection";
import useRecords from "../../hooks/useRecords";
import useTags from "../../hooks/useTags";
import getData from "../../common/getData";
import {WrapperChart} from "../../components/WrapperChart";
import {ShowMoney} from "../../components/ShowMoney";
import ReactEcharts from "echarts-for-react";
import MonthPicker from "../../components/MonthPicker";
import dayjs from "dayjs";

const Statistics: React.FC = () => {
    const [month, setMonth] = useState(dayjs(new Date()).format('YYYY-MM'))
    const categoryMap = {'-': '支出', '+' : '收入'}
    const [category, setCategory] = useState<'-' | '+'>('-')
    const {records} = useRecords()
    const _records = records.filter(item => item.category === category)
        .filter(item => dayjs(item.createdAt).format('YYYY-MM') === month)
    const {getName} = useTags()
    const chartData = getData(_records,getName)
    const amount = chartData.reduce((result, item) => {
        return result += item.value
    },0)
    const keys = chartData.map(item => item.name)
    const getOption = () => {
        return  {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}元 ({d}%)'
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
        <Layout name={'统计'}>
            <MonthPicker value={month} onChange={(value) =>setMonth(value)}/>
            <TypeSection>
                <CategorySection value={category}
                                 onChange={value => setCategory(value)}/>
            </TypeSection>
            <WrapperChart>
                <ShowMoney>
                         <span className={'title'}>
                            总{categoryMap[category]}: ￥{amount.toFixed(2)} 元
                        </span>
                    <span className={'count'}>共{keys.length}类收入项目</span>
                </ShowMoney>
                <ReactEcharts option={getOption()} lazyUpdate={false}/>
            </WrapperChart>
        </Layout>
    )
}

export default Statistics
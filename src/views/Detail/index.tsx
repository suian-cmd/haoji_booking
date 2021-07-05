import React, {useState} from "react";
import styled from "styled-components";
import useRecords, {RecordItem} from "../../hooks/useRecords";
import useTags from "../../hooks/useTags";
import dayjs from "dayjs";
import {Layout} from "../../components/Layout";
import {TypeSection} from "../../components/TypeSection";
import CategorySection from "../Home/Money/section/CategorySection";
import {Icon} from "../../components/Icon";
import {MoneyLink} from "../../components/MoneyLink";
import MonthPicker from "../../components/MonthPicker";

const DateDiv = styled.div`
  border-top: 1px solid pink;
  font-size: 16px;
  color: hotpink;
  font-weight: 700;
  padding: 5px 10px;
`;
const RecordList = styled.section`
 display:flex;
 flex-direction: column;
 justify-content: center;

`;
const RecordItems = styled.div`
  background-color:#f9faf5;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
  }
  .left{
    padding-right: 10px;
    .icon{ 
      width: 42px; 
      height: 42px;
    }
  }
  .center{
    flex: 1;
    display: flex;
    flex-direction: column;
    .nameSpan{
      font-size: 18px;
      font-weight: 700;
    }
    .noteSpan{
      margin-top: 8px;
      color: #666; 
      font-size: 14px;
      width: 90%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    .amountSpan{
      font-size: 18px;
      font-weight: 700;
    }
    .dateSpan{
      margin-top: 8px;
      color: #666; 
      font-size: 14px;
      text-align: right;
    }
  }
  
`;
const IconDiv = styled.div`
 .icon{
  width: 148px;
  height: 148px;
 }
 margin-top: 40px;
 padding: 20px;
 text-align: center;
 font-size: 24px; 
`;

const Detail: React.FC = () => {

    const [month, setMonth] = useState(dayjs(new Date()).format('YYYY-MM'))
    const [category, setCategory] = useState<'-' | '+'>('-')
    const {records} = useRecords()
    const {getName, getIcon} = useTags()
    const hash: {[key: string] : RecordItem[]} = {}
    const selectedRecords = records.filter(r => r.category === category)
        .filter(r => dayjs(r.createdAt).format('YYYY-MM') === month)

    selectedRecords.map(r => {
        const key = dayjs(r.createdAt).format('YYYY-MM-DD')
        if(!(key in hash)){
            hash[key] = []
        }
        hash[key].push(r)
        return hash
    })

    const array = Object.entries(hash).sort((a,b) => {
        if(a[0] === b[0]) return 0
        if(a[0] > b[0]) return -1
        if(a[0] < b[0]) return 1
        return 0
    })

    return (
        <Layout name={'明细'}>
            <MonthPicker value={month} onChange={(value) =>setMonth(value)}/>
            {/*<DateWrapper>*/}
            {/*    月份：*/}
            {/*    <DatePicker allowClear={false} inputReadOnly={true} picker="month"*/}
            {/*                defaultValue={moment(month,'YYYY-MM')} format={'YYYY-MM'}*/}
            {/*                onChange={selectedMonth}*/}
            {/*    />*/}
            {/*</DateWrapper>*/}
            <TypeSection>
                <CategorySection value={category}
                                 onChange={value => setCategory(value)}/>
            </TypeSection>
            {array.length === 0 ? <IconDiv>
                    <Icon name={'none'}/>
                    <MoneyLink/>
                </IconDiv> :
                array.map(([date, records], index) => {
                    return (
                        <div key={index}>
                            <DateDiv>{date}</DateDiv>
                            <RecordList>
                                {records.map((item, index) => {
                                    return (
                                        <RecordItems key={index}>
                                            <div className={'left'}>
                                            <span>
                                                <Icon name={getIcon(item.tagIds)}/>
                                            </span>
                                            </div>
                                            <div className={'center'}>
                                            <span className={'nameSpan'}>
                                                {getName(item.tagIds)}
                                            </span>
                                                <span className={'noteSpan'}>
                                                {item.note}
                                            </span>
                                            </div>
                                            <div className={'right'}>
                                            <span className={'amountSpan'}>
                                                ￥{item.amount}
                                            </span>
                                            </div>
                                        </RecordItems>
                                    )
                                })}
                            </RecordList>
                        </div>
                    )
                })}
        </Layout>
    )
}
export default Detail
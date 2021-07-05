import React from "react";
import {Layout} from "../../components/Layout";
import useRecords from "../../hooks/useRecords";
import dayjs from "dayjs";
import {ShowMoney} from "../../components/ShowMoney";
import {MoneyLink} from "../../components/MoneyLink";
import styled from "styled-components";


const Header = styled.h2`
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
  font-weight: 700;
`

const Home: React.FC = () => {

    const {incomeMoney, expenseMoney} = useRecords()
    const today = dayjs(new Date()).format('DD')
    const month = dayjs(new Date()).format('MM')
    const expense = expenseMoney(today)
    const income = incomeMoney(month)


    return (
        <Layout>
            <Header className={'header'}>今日账本</Header>
            <ShowMoney>
                <span className={'title'}>请查看，今日支出</span>
                <span className={'pay'}>￥{expense.reduce((result,amount) => {
                    return result += amount
                }, 0)}</span>
                <span className={'income'}>本月收入 ￥{income.reduce((result,amount) => {
                    return result += amount
                }, 0)}</span>
            </ShowMoney>
            <MoneyLink/>
        </Layout>
    )
}

export default Home
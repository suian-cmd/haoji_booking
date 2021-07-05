import {useEffect, useState} from "react";
import useUpdate from "./useUpdate";
import dayjs from "dayjs";
import {message} from "antd";


export type RecordItem = {
    tagIds: number
    note: string
    category: '+' | '-'
    amount: number
    createdAt: string
}

// type newRecordItem = Omit<RecordItem, 'createdAt'>

const useRecords = () => {
    const [records, setRecords] = useState<RecordItem[]>([])

    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records')
            || '[]'))
    }, [])

    useUpdate(()=>{
        window.localStorage.setItem('records',JSON.stringify(records))
    },[records])

    const addRecord = (newRecord: RecordItem) => {
        if(newRecord.tagIds <=0){
            message.warn('请选择标签！',1)
            return false
        }
        if(newRecord.amount <= 0){
            message.warn('请输入金额！',1)
            return false
        }
        setRecords([...records, newRecord])
        return true
    }

    const income = records.filter(item => item.category === '+')
    // 返回 当月收入的各项
    const incomeMoney = (month: string) => {
        const monthIncome = income.filter(item => dayjs(item.createdAt).format('MM') === month)
        return monthIncome.map(item => item.amount)
    }
    //返回 总收入金额
    const incomeAll = income.map(item => item.amount)
        .reduce((result,amount)=>{
        return result += amount
    }, 0)

    const expense = records.filter(item => item.category === '-')
    // 返回 当日支出的各项
    const expenseMoney = (today: string) => {
        const todayExpense = expense.filter(item => dayjs(item.createdAt).format('DD') === today)
        return todayExpense.map(item => item.amount)
    }
    // 返回 总支出金额
    const expenseAll = expense.map(item => item.amount).reduce((
        result,amount)=> {
            return result += amount
    },0)

    // 获取当月每天的总收入或总支出
    // 返回 [{title: 06/26, total: 600, items: [record, record...]},{title: 06/25, total: 500, items: [record, record...]}]
    const dayTotalList = (category: string) => {
        const newList = records.filter(r => r.category === category)
            .sort((a, b) =>
            dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        if(newList.length === 0) { return }

        type Result = {
            title: string, total?: number, items: RecordItem[]
        }[]
        const result: Result = [{title: dayjs(newList[0].createdAt)
                .format('MM/DD'), items: [newList[0]]}]
        for (let i =1; i < newList.length; i++){
            const current = newList[i]
            const last = result[result.length - 1]
            if(dayjs((last.title)).isSame(dayjs(current.createdAt), 'day')){
                last.items.push(current)
            }else{
                result.push({title: dayjs(current.createdAt)
                        .format('MM/DD'), items: [current]})
            }
        }
        result.map(group => group.total = group.items
            .reduce((result, item) => {
            return result += item.amount
        }, 0))

        return result
    }

    return {records, addRecord, income, incomeMoney, incomeAll,
        expense, expenseMoney, expenseAll, dayTotalList}

}

export default useRecords
import {RecordItem} from "../hooks/useRecords";


type getName = (id: number) => string
const getData = (records: RecordItem[], fn: getName) => {
    // 获得支出/收入的ID，根据ID来选出 标签名 和 amount
    const moneyTypeId = records.map(item => item.tagIds)
    const hash :{[key: string] : number} = {}
    for (let i = 0; i < moneyTypeId.length; i++){
        if(!(fn(moneyTypeId[i]) in hash)){
            hash[fn(moneyTypeId[i])] = records[i].amount
        }else{
            hash[fn(moneyTypeId[i])] = hash[fn(moneyTypeId[i])] + records[i].amount
        }
    }
    const chartData = []
    const keys = Object.keys(hash)
    for (let i = 0; i < keys.length; i++){
        chartData.push({value: hash[keys[i]], name: keys[i]})
    }
    return chartData
}

export default getData
import createId from "./createId";


const defaultTagsList = ()=>{
    const tags = [
        {id:createId(),name:"餐饮",iconName:"1",mold:"-"},  // 1
        {id:createId(),name:"娱乐",iconName:"2",mold:"-"},  // 2
        {id:createId(),name:"日用",iconName:"3",mold:"-"},  // 3
        {id:createId(),name:"通讯",iconName:"4",mold:"-"},  // 4
        {id:createId(),name:"交通",iconName:"6",mold:"-"},  // 6
        {id:createId(),name:"服饰",iconName:"9",mold:"-"},  // 9
        {id:createId(),name:"宠物",iconName:"10",mold:"-"},  // 10
        {id:createId(),name:"住房",iconName:"15",mold:"-"},  // 15
        {id:createId(),name:"运动",iconName:"22",mold:"-"},  // 22
        {id:createId(),name:"其他",iconName:"005",mold:"-"},  // 25
        {id:createId(),name:"工资",iconName:"001",mold:"+"},  // 25
        {id:createId(),name:"兼职",iconName:"002",mold:"+"},  // 25
        {id:createId(),name:"理财",iconName:"003",mold:"+"},  // 25
        {id:createId(),name:"礼金",iconName:"004",mold:"+"},  // 25
        {id:createId(),name:"其他",iconName:"005",mold:"+"},  // 25
    ]
    return tags
}


export default defaultTagsList

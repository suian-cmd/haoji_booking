import React, {useState} from "react";
import styled from "styled-components";
import useRecords from "../../../hooks/useRecords";
import {Wrapper} from 'components/Wrapper';
import {TopNav} from "../../../components/TopNav";
import CategorySection from "./section/CategorySection";
import TagsSection from "./section/TagsSection";
import KeyBoardSection from "./section/KeyBoardSection";
import {message} from "antd";
import dayjs from "dayjs";


const Main = styled.div`
  background-color:#fafbf6;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar{ 
    display: none;
  }
`;

type Category = '-' | '+'
const defaultFormData = {
    tagIds: 0 , // 标签
    note: '',  // 备注
    createdAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD'), //日期
    category: '-' as Category, // 收入/支出
    amount: 0  // 总和
};

const Money: React.FC = () => {
    const {addRecord} = useRecords()
    const [selected, setSelected] = useState(defaultFormData)
    const onChange = (obj: Partial<typeof selected>) => {
        // console.log(obj)
        setSelected({...selected,...obj})
    }
    const onSubmit = () => {
        if (addRecord(selected)){
            message.success('保存成功',1)
            setTimeout(()=>{
                setSelected({
                    ...selected,
                    note: '',
                    createdAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD'),
                    amount: 0
                })
            },0)
            // window.location.reload()
        }
    }
    return (
        <Wrapper>
            <TopNav name={'back'}>
                <CategorySection value={selected.category}
                                 onChange={(category) => {onChange({category})}}/>
            </TopNav>
            <Main>
                <TagsSection value={selected.tagIds} mold={selected.category}
                             onChange={(tagIds) => {onChange({tagIds : tagIds})}}/>
            </Main>
            <KeyBoardSection note={selected.note} createdAt={selected.createdAt}
                             amount={selected.amount}
                             onChangeNote={(note) => {onChange({note})}}
                             onChangeAmount={(amount)=>{onChange({amount})}}
                             onChangeDate={(createdAt) => {onChange({createdAt})}}
                             onSubmit={() => {onSubmit()}}/>
        </Wrapper>
    )
}


export default Money

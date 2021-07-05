import React, {useRef, useState} from "react";
import useTags from "../../../../hooks/useTags";
import {useHistory, useParams} from "react-router-dom";
import {message, Modal} from "antd";
import {Wrapper} from "../../../../components/Wrapper";
import {TopNav} from "../../../../components/TopNav";
import styled from "styled-components";
import {TypeSection} from "../../../../components/TypeSection";
import CategorySection from "../section/CategorySection";
import {Icon} from "../../../../components/Icon";
import {defaultIcon} from "../../../../common/iconsLib";
import {ExclamationCircleOutlined} from "@ant-design/icons";


const InputTag = styled.section`
  padding: 12px 16px;
  > label{
    display: flex;
    align-items: center;
    > input {
      flex: 1;
      border: none;
      border-bottom: 2px solid #000;
      outline: none;
      padding: 10px 0;
      margin: 0 12px;
      font-size: 16px;
    }
    .icon{
      margin-right: 10px;
      width: 38px;
      height: 38px;
    }
    
  }
  
`;
const IconList = styled.section`
  flex: 1;
  overflow-y: auto;
  ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    li{
      padding: 20px;
      > .icon{
        width: 38px;
        height: 38px;
      }
      &.selected{
        background-color: pink;
        box-shadow: 1px 2px 2px #ddd;
      }
    }
  }
`;
const Button = styled.section`
 padding-top: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 margin-bottom: 10px;
 > button{
    outline: none;
   font-size: 18px;
    border-radius: 4px;
    padding: 10px 24px;
    margin: 0 24px;
    font-weight: 700;
    &.save{
      border: 1px solid lightpink;
      background-color:lightpink;
    }
    &.delete{
      border: 1px solid #FFFFFF;
      background-color:lightpink;
      
    }
    .selected{
      background-color:lightpink;
      color: #fff;
    }
 }


`;

type Params = {
    id : string
}

const EditTag: React.FC = () => {
    const [iconName, setIconName] = useState('9999')
    const [category, setCategory] = useState<'-' | '+'>('-')
    const {findTag, updateTag, deleteTag, addTag} = useTags()
    const history = useHistory()
    const {id: idString} = useParams<Params>()
    const tag = findTag(parseInt(idString)) || ''
    const inputRef = useRef<HTMLInputElement>(null)
    const selectTag = (iName : string) =>{
        if(iconName === '9999'){
            return tag.iconName === iName ? 'selected' : ''
        }else {
            return iconName === iName ? 'selected' : ''
        }

    }
    const saveTag = () => {
        if(inputRef.current !== null
            && inputRef.current.value.trim() !== ''
            && inputRef.current.value.trim().length <=4){
            let newIconName = iconName !== '9999' ? iconName: tag.iconName
            updateTag(tag.id, {name: inputRef.current.value.trim().substring(0,4),
                iconName: newIconName}, tag.mold)
            message.success('修改成功',1)
            history.goBack();
        }else {
            message.error('标签名不能为空且不能超过四个字符',3)
        }
    }

    const addNewTag = () => {
        if(inputRef.current !== null
        && inputRef.current.value.trim() !== ''
        && inputRef.current.value.trim().length <= 4){
            addTag(inputRef.current.value.trim().substring(0,4),
                iconName, category)
            message.success('添加成功',1)
            history.goBack()
        }else {
            message.error('标签名不能为空且不能超过四个字符',2)

        }
    }

    const deleteOneTag = () => {
        if(inputRef.current !== null){
            Modal.confirm({
                title: '删除标签?',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <div>
                        <p>您确定要删除该标签吗？可能导致部分数据没有标签名（显示为已删）。</p>
                    </div>
                ),
                okText: '确定',
                cancelText:'取消',
                onOk() {
                    deleteTag(tag.id)
                    message.success('删除成功',1)
                    history.goBack()
                },
                onCancel() {
                    return false
                },
            })
        }
    }

    const getIcon = (iconName: string) => {
        setIconName(iconName)
    }


    return (
        <Wrapper>
            <TopNav name={'back'}>
                {idString === '9999' ? '新建标签' : '编辑标签'}
            </TopNav>
            <InputTag>
                {idString === '9999' ? <>
                    <TypeSection>
                        <CategorySection value={category}
                                         onChange={value => setCategory(value)}/>
                    </TypeSection>
                    <label>
                        <Icon name={iconName}/>
                        <input type={'text'} placeholder={'请输入标签名称'}
                                defaultValue={''} ref={inputRef}
                        />
                    </label>
                </> : <label>
                    <Icon name={iconName === '9999' ? tag.iconName
                        : iconName}/>
                    <input type={'text'} placeholder={tag.name}
                           defaultValue={tag.name} ref={inputRef}/>
                </label>}
            </InputTag>
            <IconList>
                <ul>
                    {
                        defaultIcon.map((item) => {
                            return (
                                <li key={item.id}
                                    onClick={() => getIcon(item.iconName)}
                                    className={selectTag(item.iconName)}>
                                    <Icon name={item.iconName}/>
                                </li>
                            )
                        })
                    }
                </ul>
            </IconList>
            {idString === '9999' ? <Button>
                <button className={'save'} onClick={addNewTag}>
                    添加标签
                </button>
            </Button> : <Button>
                <button className={'save'} onClick={saveTag}>
                    保存标签
                </button>
                <button className={'delete'} onClick={deleteOneTag}>
                    删除标签
                </button>
            </Button>}
        </Wrapper>
    )
}

export default EditTag
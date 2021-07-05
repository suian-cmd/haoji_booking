import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import useTags from "../../../../hooks/useTags";
import styled from "styled-components";
import {Icon} from "../../../../components/Icon";

const Wrapper = styled.section`
   padding: 10px 38px;   
   >ol {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-right: -24px;
    >li{
       width: 20%;
      background-color:#fff;
      border-radius: 10px;
      box-shadow: 2px 3px 4px #ddd;
      padding: 10px 0px;
      margin-top: 12px;
      margin-right: 12px;
      display:flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 12px;
      >span{
        padding-top: 5px
      }
      .icon{
        width: 28px;
        height: 28px;
        fill:rgba(0,0,0,.6)
      }
    }
     >.set a{
         display: flex;
         flex-direction: column;
         color: inherit;
         span{
           padding-top: 5px
       }
     }
    .selected{
      background-color: pink;
      box-shadow: 1px 2px 2px #ddd;
    } 
  }
`;

type Props = {
    value: number
    mold: string
    onChange: (value: number) => void
}

const TagsSection: React.FC<Props> = (props) => {
    let {url} = useRouteMatch()
    const {tags} = useTags()
    const selectedTagId = props.value
    const selectedMold = props.mold
    const toggleTag = (tagId: number) => {
        props.onChange(tagId);
    }
    const moldTags = tags.filter(tag => tag.mold === selectedMold)
    if(tags.length > 0 && moldTags.length>0 && moldTags.map(item => item.id).indexOf(selectedTagId) === -1){
        setTimeout(()=>{
            props.onChange(moldTags[0].id);
        },0)
    }

    return (
        <Wrapper>
            <ol>
                {moldTags.map(tag =>{
                    return (
                        <li key={tag.id} onClick={() => toggleTag(tag.id)}
                            className={selectedTagId === tag.id ? 'selected' : ''}>
                            <Icon name={tag.iconName}/>
                            <span>{tag.name}</span>
                        </li>
                    )
                })}
                <li className={'set'}>
                    <Link to={`${url}/edit`}>
                        <Icon name={'set'}/>
                        <span>设置</span>
                    </Link>
                </li>
            </ol>
        </Wrapper>
    )
}

export default TagsSection
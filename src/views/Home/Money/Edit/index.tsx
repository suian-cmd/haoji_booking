import React, {useState} from "react";
import styled from "styled-components";
import {Link, useRouteMatch} from "react-router-dom";
import useTags from "../../../../hooks/useTags";
import {Wrapper} from "../../../../components/Wrapper";
import {TopNav} from "../../../../components/TopNav";
import { TypeSection } from "components/TypeSection";
import CategorySection from "../section/CategorySection";
import {Icon} from "../../../../components/Icon";



const TagsList = styled.section`
  flex: 1;
  overflow-y: auto;
  ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  li{ 
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      margin-left: 10px;
      border-bottom: 1px solid pink;
     &:nth-child(1){
       border-top: 1px solid pink;
     }
      > .tags{
        display:flex;
        align-items: center;
        > span {
          padding-left: 8px;
          font-size: 18px;
        }
        > .icon{
          width: 42px;
          height: 42px;
        }
      }
      .icon{
         width: 24px;
         height: 24px;
      }
  }
`;
const AddTag = styled.section`
  text-align: center;
  background-color: lightpink;
  font-size: 22px;
  padding: 14px 0;
  a {
    color: inherit;
  }
`;

const Edit: React.FC = () => {
    const {url} = useRouteMatch()
    const {tags} = useTags()
    const [category, setCategory] = useState<'-' | '+'>('-')
    const moldTags = tags.filter(tag => tag.mold === category)

    return(
        <Wrapper>
            <TopNav name={'back'} >
                标签管理
            </TopNav>
            <TypeSection>
                <CategorySection value={category}
                                 onChange={value => setCategory(value)}/>

            </TypeSection>
            <TagsList>
                <ul>
                {
                    moldTags.map((tag) => {
                        return (
                            <li key={tag.id}>
                                <div className={'tags'}>
                                    <Icon name={tag.iconName}/>
                                    <span>{tag.name}</span>
                                </div>
                                <Link to={`${url}/${tag.id}`}>
                                    <Icon name={'more'}/>
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </TagsList>
            <AddTag>
                <Link to={`${url}/9999`}>
                    添加标签
                </Link>
            </AddTag>
        </Wrapper>
    )
}

export default Edit
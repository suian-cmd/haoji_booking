import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  font-size: 18px;
  padding: 3px 0;
  >span{
    padding: 4px 18px;
    margin-left: 16px
  }
  .selected{
    background-color: lightpink;
    border: none;
    border-radius: 4px;
  } 
`;

type Props = {
    value: '-' | '+'
    onChange: (value: '-' | '+') => void
}

const CategorySection: React.FC<Props> = (props) => {
    const categoryMap = {'-': '支出', '+' : '收入'}
    const category = props.value
    // 等价 type Keys = '-' | '+'
    type Keys = keyof typeof categoryMap
    const [categoryList] = useState<Keys[]>(['-', '+'])
    return (
        <Wrapper>
            {
                categoryList.map(type =>
                    <span key={type} onClick={() => {props.onChange(type)}}
                          className={category === type ? 'selected' : ''}
                    >{categoryMap[type]}</span>)
            }
        </Wrapper>
    )
}

export default CategorySection
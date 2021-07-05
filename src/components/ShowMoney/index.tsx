import {PropsWithChildren} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    padding: 10px 5px;
    font-weight: 700;
  }
  .title{
    color: lightpink;
    font-size: 28px;
  }
  .titleWrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 5px solid pink;
    font-size: 26px;
    padding: 8px;
    color: rgba(185, 186, 184, 0.9);
    & .icon{
      margin-right: 12px;
      width: 38px;
      height: 38px;
      fill: pink;
    }
  }
  .pay{
    font-size: 32px;
    color: lightpink;
  }
  .count{
    margin-top: 10px;
    font-size: 18px;
    color: rgba(185, 186, 184,0.9);
    padding:10px 16px;
    background-color:#f9faf5;
    border-radius: 8px;
  }
  .income{
    margin-top: 10px;
    color: #B7B7B7;
    font-size: 28px;
  }
`

const ShowMoney = (props : PropsWithChildren<any>) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export {ShowMoney}
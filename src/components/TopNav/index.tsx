import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {Icon} from "../Icon";

const NavWrapper = styled.div`
  background-color: #f8f8f8;
  position: relative;
  text-align: center;
  padding: 8px 0;
  .back-icon{
    position: absolute;
    left: 10px;
    padding: 0 15px 0 5px;
    .icon{
      width: 24px;
      height: 24px;
    }
  }
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  span{
    padding: 4px 8px;
  }
`;

type Props = {
    name?:string
}

const TopNav: React.FC<Props> = (props) => {
    const history =useHistory()
    const backOne = ()=>{
        //history.replace('/home')
        history.goBack()
        // window.history.back()
    }
    return (
        <NavWrapper>
            {props.name && <div className="back-icon" onClick={backOne}>
                <Icon name={props.name}/></div>}
            <Title>
                {props.children}
            </Title>
        </NavWrapper>
    );
}

export {TopNav}
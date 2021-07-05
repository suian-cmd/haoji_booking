import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";
import {Icon} from "../Icon";


const NavWrapper = styled.nav`
  background-color: #F1F1F1;
  >ul{
    display: flex;
    margin: 0;
    >li {
      flex: 1;
      text-align: center;
      padding: 8px 0;
      .selected{
        color: deeppink;
        .icon{
          fill: deeppink;
        }
      }
      .icon{
        width: 24px;
        height: 24px;
        fill: #ffbcbe;
      }
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ffbcbe;
      }
    }
  }
`

const Nav: React.FC = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <NavLink to={'/home'} activeClassName={'selected'}>
                        <Icon name={'home'}/>
                        今日
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/detail'} activeClassName={'selected'}>
                        <Icon name={'detail'}/>
                        明细
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/statistics'} activeClassName={'selected'}>
                        <Icon name={'statistics'}/>
                        统计
                    </NavLink>
                </li>
            </ul>
        </NavWrapper>
    )
}

export {Nav}
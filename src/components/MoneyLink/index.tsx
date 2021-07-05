import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div`
  margin: 28px auto 0;
  background-color: lightpink;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  padding: 14px;
  max-width: 141px;
  text-align: center;
  a {
    color: deeppink;
  }
`

const MoneyLink: React.FC = () => {
    return (
        <div>
            <Wrapper>
                <Link to={`/home/money`}>记一笔</Link>
            </Wrapper>
        </div>
    )
}

export {MoneyLink}
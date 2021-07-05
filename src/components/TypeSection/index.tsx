import React from 'react';
import styled from 'styled-components';



const Wrapper = styled.section`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  span{
    padding: 8px 24px;
    font-size: 18px;
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 700;
  }
  .selected{
    background-color: lightpink;
    border: none;
    border-radius: 4px;
  }
`;

const TypeSection: React.FC = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export {TypeSection}
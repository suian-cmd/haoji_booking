import styled from "styled-components";
import React from "react";
import {Nav} from "../Nav";
import { TopNav } from "components/TopNav";


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display: none;
  }
`
type Props = {
    name?: string
}


const Layout: React.FC<Props> = (props: any) => {
    return (
        <Wrapper>
            {props.name ? <TopNav>{props.name}</TopNav> : ''}
            <Main>
                {props.children}
            </Main>
            <Nav/>
        </Wrapper>
    )
}

export {Layout}
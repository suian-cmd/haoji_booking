import React from "react";
import NotesSection from "./NotesSection";
import NumberPadSection from "./NumberPadSection";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: pink;
  box-shadow: 2px 2px 3px rgba(0,0,0,.8);
`;

type Props = {
    note: string
    createdAt: string
    amount: number
    onChangeNote: (note: string) => void
    onChangeAmount: (amount: number) => void
    onChangeDate: (createdAt: string) => void
    onSubmit? : () => void
}

const KeyBoardSection: React.FC<Props> = (props) => {
    return (
        <Wrapper>
            {/*{...props} 自动匹配符合的项*/}
            <NotesSection {...props}/>
            <NumberPadSection amount={props.amount}
                              onChangeAmount={props.onChangeAmount}
                              onSubmit={props.onSubmit}/>
        </Wrapper>
    )
}

export default KeyBoardSection
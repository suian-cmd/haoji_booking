import React, {useRef, useState} from "react";
import styled from "styled-components";
import {Icon} from "../../../../components/Icon";
import {MaskDiv} from "../../../../components/MaskDiv";
import moment from "moment";
import {DatePicker} from "antd";

const Wrapper = styled.section`
    padding: 0px 20px;
  > label{
    position: relative;
    display:flex;
    align-items: center;
    margin-top: 10px;
    >input{
      width: 100%;
      padding: 12px 48px;
      background-color:#fff;
      border: none;
      border-radius: 10px; 
      &.dateIpt{  
        padding: 12px 8px 12px 48px; 
      }
    }
    .icon{
      position: absolute;
      left: 5px;
      width: 28px;
      height: 28px;
    }
  }
  .goNote{
      width: 100%;
      padding: 10px 48px;
      background-color:#fff;
      border: none;
      border-radius: 10px; 
      span{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
  }
  .create_date{
    width: 100%;
    padding: 6px 10px 6px 37px;
    background-color:#fff;
    border: none;
    border-radius: 10px;
    >.ant-picker{
      width: 100%;
      background-color:#fff;
      box-shadow: none !important; 
      border: none;
    }
  }
 
`;

type Props = {
    note: string
    createdAt: string
    onChangeNote: (value: string) => void
    onChangeDate: (createdAt: string) => void
}


const NotesSection: React.FC<Props> = (props) => {
    const {note, createdAt} = props
    const [styleInput, setStyleInput] = useState({display: 'none'})
    const noteRef = useRef<HTMLTextAreaElement>(null)
    // const dateRef = useRef<HTMLInputElement>(null)

    const onBlur = () => {
        if(noteRef.current && noteRef.current.value.trim() ==='' ){
            noteRef.current.value = ''
        }
    }
    const onFocus = () => {
        if(noteRef.current && noteRef.current.value.trim() ==='' ){
            noteRef.current.value = '  '
        }
    }
    const toNote = () => {
        setStyleInput({display: 'block'})
    }
    const ok = () => {
        if (noteRef.current !== null) {
            props.onChangeNote(noteRef.current.value.trim());
            setStyleInput({display: 'none'});
        }

    }
    const clearText = () => {
        if (noteRef.current !== null) {
            noteRef.current.value = ''
            props.onChangeNote(noteRef.current.value.trim());
            setStyleInput({display: 'none'});
        }

    }

    const selectDate = (date:any,dateString: string) =>{
        props.onChangeDate(dateString)
    }

    if(note === '' && noteRef.current){
        noteRef.current.value = ''
    }
    return (
        <Wrapper>
            <label className={'goNote'} onClick={toNote}>
                <Icon name={'note'}/>
                <span>{note ? note : '写点备注吧...'}</span>
            </label>
            <label className={'create_date'}>
                <Icon name={'date'}/>
                <DatePicker allowClear={false} inputReadOnly={true} onChange={selectDate}
                            defaultValue={moment(createdAt,'YYYY-MM-DD')} format={'YYYY-MM-DD'} />
            </label>
            <label className={'goNote'}>
                <Icon name={'money'}/>
                <span>金额：</span>
            </label>
            <MaskDiv style={styleInput}>
                <div className={'box'}>
                    <div className={'title'}>
                        <span onClick={clearText}><Icon name='clear'/></span>
                        <span>记账备注</span>
                        <span onClick={ok}><Icon name='ok'/></span>
                    </div>
                    <label className={'main'}>
                        <textarea defaultValue={note} ref={noteRef}
                                  placeholder={'请写点备注'}
                                  onFocus={onFocus}
                                  onBlur={onBlur}
                                  style={{resize:'none'}}
                        />
                    </label>
                </div>
            </MaskDiv>
        </Wrapper>
    )
}

export default NotesSection
import React from "react";
import styled from "styled-components";
import {DatePicker} from "antd";
import moment from "moment";
import dayjs from "dayjs";



const Wrapper = styled.div`
  margin: 10px 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-picker{
    width: 55%;
  }
`

type Props = {
    value : string
    onChange : (month : string) => void
}

const MonthPicker:React.FC<Props> = (props) => {
    const selectedMonth = (date:any, dateString: string) =>{
        props.onChange(dayjs(date).format('YYYY-MM'))
    }
    return(
            <Wrapper>
                月份：
                <DatePicker allowClear={false} inputReadOnly={true} picker="month"
                            defaultValue={moment(props.value,'YYYY-MM')} format={'YYYY-MM'}
                            onChange={selectedMonth}
                />
            </Wrapper>
    )
}

export default MonthPicker
import styled from 'styled-components';

const MaskDiv = styled.div` 
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color:rgba(0,0,0,.6);
    z-index: 2;
    .box{
      margin: 40% auto 0px;
      border-radius: 20px;
      width: 337px;
      height: 385px;
      background-color:#fff;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    .title{
      display:flex;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: #f1f1f1;
      font-size: 28px;
      padding: 10px 20px;
      .icon{
        width: 28px;
        height: 28px;
      }
    }
   .main{
      height: 100%;
      display:flex;
      flex-direction: column;
      padding: 10px 20px;
      background: pink;
      border-radius: 0 0 20px 20px;
      span{
        color: #b4b6b5;
        text-align: left;
        font-size: 24px;
        padding: 10px 0;
      }
      textarea{
        outline: none;
        border: none;
        border-radius: 10px;
        padding: 15px;
        font-size: 22px;
        background-color:#f9f9f7;
        width: 300px;
        height: 300px;
        resize:none;
      }
      button{
        outline: none;
        border: none;
        font-size: 18px;
        color: #fff;
        margin-top: 30px;
        padding: 10px;
        border-radius: 10px;
        background-color:#9dcac0;
      }
    }
`;


export {MaskDiv}
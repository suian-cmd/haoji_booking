import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 480px;
    margin: 0 auto;
    background-color:#fff;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    display: flex;
    flex-direction: column;
`;

export {Wrapper}

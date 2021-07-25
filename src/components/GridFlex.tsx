import styled from "styled-components";


export const GridFlex = styled.div<{justifyContents: string}>`
    display: flex;
    justify-content: ${({justifyContents}) => justifyContents};
  `
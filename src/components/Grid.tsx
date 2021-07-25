import styled from "styled-components";

export const Grid = styled.div<{rows: number, cols: number}>`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    column-gap: 1px;
    row-gap: 1px;
    grid-template-rows: ${(props) => {
      return `repeat(${props.rows}, 1fr)`;
    }};
    grid-template-columns:${(props) => {
      return `repeat(${props.cols}, 1fr)`;
    }};
  `
import styled from "styled-components";

export const GridContainer = styled.div<{rowStart: number, rowEnd: number, colStart: number, colEnd: number}>`
    grid-row-start: ${({rowStart}) => rowStart};
    grid-row-end:  ${({rowEnd}) => rowEnd};
    grid-column-start: ${({colStart}) => colStart};
    grid-column-end:  ${({colEnd}) => colEnd};
    padding-bottom: 30px;
  `
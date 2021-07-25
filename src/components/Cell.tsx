import styled from  'styled-components'

const buttonColor = (props :{ active: boolean}) : string => {
  if (props.active) {
    return 'color: lightgreen'
  }
  return ''
}

type CellProps = {
  active: boolean,
  activate?: (a: boolean) => void
}

export const CellWrapper = styled.div<CellProps>`
    button {
      color: lightgreen
    }
  
    max-width: 15px;
    min-width: 15px;
    max-height: 15px;
    min-height: 15px;
  `
const  Cell = (props : CellProps) => {
    const {activate, active} = props
    const onClickSafe = () => {
      activate && activate(!active)
    }
    
    return (
      <CellWrapper {...props}>
        <button onClick={onClickSafe}>&nbsp;</button>
      </CellWrapper>
    )
}

export default Cell
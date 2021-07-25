import styled from  'styled-components'

const buttonColor = (props :{ active: boolean}) : string => {
  if (props.active) {
    return 'background-color: lightgreen;'
  }
  return ''
}

type CellProps = {
  active: boolean,
  activate?: (a: boolean) => void
}

export type CellType = ReturnType<typeof Cell>

export const CellWrapper = styled.div<CellProps>`
   max-width: 15px;
   min-width: 15px;
   max-height: 15px;
   min-height: 15px;
   button {
     ${buttonColor}
      max-width: 15px;
      min-width: 15px;
      max-height: 15px;
      min-height: 15px;
   }
  
  `
const  Cell = (props : CellProps) => {
    const {activate, active } = props
    const onClickSafe = () => {
      activate && activate(!active)
    }
    
    return (
      <CellWrapper {...props}>
        <button onClick={onClickSafe}>&nbsp;</button>
      </CellWrapper>
    )
}

export const getCell = (key: string, started: boolean, active: boolean, activate: ((a: boolean) => void)): CellType => {

 // console.log({started})
  if (started) {
    return <Cell active={active} key={key} />
  }
  else {
    return <Cell  active={active} key={key} activate={activate} />
  }
}


export default Cell
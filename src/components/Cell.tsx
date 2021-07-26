import styled from  'styled-components'
import Dot from './dot.png';

const visible = (props : { isVisible: boolean } ) : string => {
  if (props.isVisible) {
    return ''
  }
  return 'visibility: hidden;'
}

type CellProps = {
  active: boolean,
  activate?: (a: boolean) => void
}
type CellWrapperProps = {
  active: boolean,
  isVisible: boolean
}

export type CellType = ReturnType<typeof Cell>

export const CellWrapper = styled.div<CellWrapperProps>`
   max-width: 15px;
   min-width: 15px;
   max-height: 15px;
   min-height: 15px;
   ${visible}
   input[type='checkbox'] {
      max-width: 15px;
      min-width: 15px;
      max-height: 15px;
      min-height: 15px;
      margin: 0 0 0 0
   }
   img {
      max-width: 10px;
      min-width: 10px;
      max-height: 6px;
      min-height: 6px;
   }
  
  `
const  Cell = (props : CellProps) => {
    const {activate, active } = props
    const onClickSafe = () => {
      activate && activate(!active)
    }
   // const isVisible = active || !!activate
    if (!activate && active) {
      return (
      <CellWrapper active= {active} isVisible = {true}>
        <img src={Dot} alt={"dot"}/>
      </CellWrapper>
      )
    }
    return (
      <CellWrapper active= {active} isVisible = {!!activate}>
        <input type="checkbox" onChange={onClickSafe} checked={active}/>
      </CellWrapper>
    )
}

export const getCell = (key: string, started: boolean, active: boolean, activate: ((a: boolean) => void)): CellType => {

  if (started) {
    return <Cell active={active} key={key} />
  }
  else {
    return <Cell  active={active} key={key} activate={activate} />
  }
}


export default Cell
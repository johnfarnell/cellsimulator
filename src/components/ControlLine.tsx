import styled from "styled-components";

const labelColor = (props :{ started: boolean}) : string => {
  if (props.started) {
    return 'color: lightgrey'
  }
  return ''
}
export const ControlLineWrapper = styled.div<{
  started: boolean
}>`
    display: grid;
    grid-row-gap: 24px;
    justify-content: center;
    align-items: center;
    grid-template-rows:1fr, 1fr;
    grid-template-columns:repeat(8, 1fr);
    .label {
      ${labelColor}
    }
    .input:disabled {
      background-color: lightgrey
    };
    input[type=text] {
        width: 25px;
    }
    button:disabled {
      background-color: lightgrey
    };
    .rows {
      grid-column-start: 3;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 1;
    }
    .cols {
      grid-column-start: 5;
      grid-column-end: 6;
      grid-row-start: 1;
      grid-row-end: 1;
    }
    .start {
      grid-column-start: 2;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    .repeat {
      grid-column-start: 3;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    .stop {
      grid-column-start: 4;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    .clear {
      grid-column-start: 5;
      grid-column-end: 5;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    .speedup {
      grid-column-start: 6;
      grid-column-end: 6;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    .slowdown {
      grid-column-start: 7;
      grid-column-end: 7;
      grid-row-start: 2;
      grid-row-end: 2;
    }

  `
type ControlLineProps = {
  setNumberOfRows: (numberOfRows: number) => void
  setNumberOfCols: (numberOCols: number) => void
  started: boolean
  startable: boolean
  setStart: () => void
  setRepeat: () => void
  repeatable: boolean
  setStop: (keep: boolean) => void
  numberOfRows: number
  numberOfCols: number
  slowDown: () => void
  speedUp: () => void
  slowestInterval: boolean
  quickestInterval: boolean
}

const ControlLine = (props: ControlLineProps) => {
    const {
      setNumberOfRows,
      setNumberOfCols,
      started,
      startable,
      setStart,
      setStop,
      setRepeat,
      repeatable,
      numberOfRows,
      numberOfCols,
      slowDown,
      speedUp,
      slowestInterval,
      quickestInterval
      } =  props
      return  (
        <ControlLineWrapper started={started}>
            <div className="rows">
              <label className="label">
                Rows :  &nbsp;
                <input disabled={started} type="text" name="rows" value={numberOfRows} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumberOfRows(Number(event.target.value))} />
              </label>
            </div>
            <div className="cols">
              <label className="label">
                Cols : &nbsp;
                <input disabled={started}  type="text" name="columns" value={numberOfCols} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumberOfCols(Number(event.target.value))} />
              </label>
            </div>
            <div className="start">
                <button  disabled={!startable} onClick={() => setStart()}>Start</button>
            </div>
            <div className="repeat">
                <button disabled={!repeatable} onClick={() => setRepeat()}>Repeat</button>
            </div>
            <div className="stop">
                <button disabled={!started}  onClick={() => setStop(true)}>Stop</button>
            </div>
            <div className="clear">
                <button disabled={!(started||startable)} onClick={() => setStop(false)}>Clear</button>
            </div>
            <div className="speedup">
                <button disabled={quickestInterval} onClick={() => speedUp()}>Speed-up</button>
            </div>
            <div className="slowdown">
                <button disabled={slowestInterval} onClick={() => slowDown()}>Slow-down</button>
            </div>
        </ControlLineWrapper>
    )
}
     
export default ControlLine

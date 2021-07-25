import { useEffect, useReducer } from 'react';
import { getCell } from './components/Cell';
import ControlLine from './components/ControlLine';
import { Grid } from './components/Grid';
import { GridContainer } from './components/GridContainer';
import { GridFlex } from './components/GridFlex';
import { GridHeading } from './components/GridHeading';
import { GridMain } from './components/GridMain';
import { initialisedRowsOfCells } from './generator/utility';
import { isActive, isEqualToInitialValues } from './state/cellValues';
import { postNextGenerateAction, setNumberOfCols, setNumberOfRows, setStart, setRepeat, setStop, activateCell } from './state/dispatchactions';
import { initialReducerState, reducer } from './state/reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialReducerState)
  const { numberOfCols, numberOfRows, cellValues, started, lastRunCellValues } = state
  const rows = initialisedRowsOfCells(numberOfRows, numberOfCols);
  useEffect(() => {
    if (!started) return
    let timer1 = setTimeout(() => { dispatch(postNextGenerateAction(state)) }, 1000)
    return () => {
      clearTimeout(timer1)
    }
  })
  const startable = !(started || isEqualToInitialValues(cellValues))
  const repeatable = !(started || isEqualToInitialValues(lastRunCellValues))

  return (
    <GridMain>
      <GridContainer rowStart={1} rowEnd={1} colStart={2} colEnd={4}>
        <GridFlex justifyContents="center">
          <GridHeading className="center">Cell Simulator By John Farnell</GridHeading>
        </GridFlex>
      </GridContainer>
      <GridContainer rowStart={2} rowEnd={2} colStart={2} colEnd={4}>
        <GridFlex justifyContents="center">
          <ControlLine
            setNumberOfRows={(setNumberOfRows(dispatch))}
            setNumberOfCols={setNumberOfCols(dispatch)}
            started={started}
            startable={startable}
            setStart={setStart(dispatch)}
            setStop={setStop(dispatch)}
            setRepeat={setRepeat(dispatch)}
            repeatable={repeatable}
            numberOfRows={numberOfRows}
            numberOfCols={numberOfCols}
          />
        </GridFlex>
      </GridContainer>
      <GridContainer rowStart={3} rowEnd={3} colStart={2} colEnd={4}>
        <GridFlex justifyContents="center">
          <Grid rows={numberOfRows} cols={numberOfCols}>
            {
              rows.map(cols => {
                return cols.map(key => {
                  const active = isActive(key, cellValues)
                  return getCell(key, started, active, activateCell(dispatch)(key, active))
                })
              })
            }
          </Grid>
        </GridFlex>
      </GridContainer>
    </GridMain>
  )
}

export default App;

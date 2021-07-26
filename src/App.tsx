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
import { postNextGenerateAction, setNumberOfCols, setNumberOfRows, setStart, setRepeat, setStop, activateCell, speedUp, slowDown } from './state/dispatchactions';
import { initialReducerState, isQuickestInterval, isSlowestInterval, reducer } from './state/reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialReducerState)
  const { numberOfCols, numberOfRows, cellValues, started, lastRunCellValues, interval } = state

  //Get a 2 dimensional array of all the keys in the grid .. e.g "4_5" is row 5, column 6 (zero-array)
  const rows = initialisedRowsOfCells(numberOfRows, numberOfCols);
  useEffect(() => {
    if (!started) return
    /*
    * This is the main section of the logic, where periodically, as controlled by the "interval"
    * setting, the next generation of the "active" cells are generated
    */
      let actionTimer = setTimeout(() => { dispatch(postNextGenerateAction(state)) }, interval)
    return () => {
      clearTimeout(actionTimer)
    }
  })
  const startable = !(started || isEqualToInitialValues(cellValues))
  const repeatable = !(started || isEqualToInitialValues(lastRunCellValues))

  const slowestInterval = !started || isSlowestInterval(interval)
  const quickestInterval = !started ||  isQuickestInterval(interval)

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
            speedUp={speedUp(dispatch)}
            slowDown={slowDown(dispatch)}
            slowestInterval = {slowestInterval}
            quickestInterval = {quickestInterval}
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

import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, START, STOP, UPDATE_CELLS, REPEAT } from "../actions/actiontypes"
import { CellValues, initCellValues } from "./cellValues"

export type State = {
  started: boolean
  numberOfRows: number
  numberOfCols: number
  cellValues: CellValues
  lastRunCellValues: CellValues
}

export const initialReducerState: State = {
  started: false,
  cellValues: {...initCellValues},
  lastRunCellValues: {...initCellValues},
  numberOfRows: 35,
  numberOfCols: 35,
}
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case START:
      return { ...state, started: true, lastRunCellValues: {...state.cellValues}  }
    case REPEAT:
      return { ...state, started: true, cellValues: {...state.lastRunCellValues} }
    case STOP: {
      return action.keep ? {  ...state, started: false } :  {  ...state, started: false, cellValues: {...initCellValues} } 
    }
    case NUMBER_OF_ROWS:
      return { ...state, started: false, cellValues:  {...initCellValues}, numberOfRows: action.numberOfRows }
    case NUMBER_OF_COLS:
      return { ...state, started: false, cellValues:  {...initCellValues}, numberOfCols: action.numberOfCols }
    case ACTIVATE_CELL: {
        const cellValuesNew = { ...state.cellValues }
        console.log({reducer: action.payload.activate})
        cellValuesNew[action.payload.key] = action.payload.activate
        return { ...state, cellValues: cellValuesNew }
      }
    case UPDATE_CELLS: {
        return { ...state, cellValues: action.cellValues }
    }
  }
}

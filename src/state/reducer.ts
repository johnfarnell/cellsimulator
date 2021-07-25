import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, START, STOP, UPDATE_CELLS } from "../actions/actiontypes"
import { CellValues, initCellValues } from "./cellValues"

export type State = {
  started: boolean
  numberOfRows: number
  numberOfCols: number
  cellValues: CellValues
}

export const initialReducerState: State = {
  started: false,
  cellValues: {...initCellValues},
  numberOfRows: 50,
  numberOfCols: 50,
}
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case START:
      return { ...state, started: true }
    case STOP: {
      return { ...state, started: false }
    }
    case NUMBER_OF_ROWS:
      return { ...state, started: false, numberOfRows: action.numberOfRows }
    case NUMBER_OF_COLS:
      return { ...state, started: false, numberOfCols: action.numberOfCols }
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

import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, START, STOP, UPDATE_CELLS, REPEAT, SPEED_UP, SLOW_DOWN } from "../actions/actiontypes"
import { CellValues, initCellValues } from "./cellValues"

export type State = {
  started: boolean
  numberOfRows: number
  numberOfCols: number
  cellValues: CellValues
  lastRunCellValues: CellValues
  interval: number
}

export const intervals:number[] = [10000, 5000, 2000, 1000, 500, 200, 100]

export const isSlowestInterval = (interval: number) => {
  return getSlowerInterval(interval) === interval 
}
export const isQuickestInterval = (interval: number) => {
  return getFasterInterval(interval) === interval 
}
export const getSlowerInterval = (interval: number) => {
  for (let i = intervals.length -1; i >= 0; i--) {
    if (intervals[i] > interval) {
        return intervals[i]
    }
  }
  return interval 
}
export const getFasterInterval = (interval: number) => {
  for (let i = 0; i <=intervals.length -1; i++) {
    if (intervals[i] < interval) {
        return intervals[i]
    }
  }
  return interval 
}

export const initialReducerState: State = {
  started: false,
  cellValues: {...initCellValues},
  lastRunCellValues: {...initCellValues},
  numberOfRows: 35,
  numberOfCols: 35,
  interval: 200
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
        cellValuesNew[action.payload.key] = action.payload.activate
        return { ...state, cellValues: cellValuesNew }
      }
    case UPDATE_CELLS: {
        return { ...state, cellValues: action.cellValues }
    }
    case SPEED_UP: {
      const {interval} = state 
      const fasterInterval = getFasterInterval(interval)
      if (interval !== fasterInterval) {
        return { ...state, interval: fasterInterval }
      } else {
        return state
      }
    }
    case SLOW_DOWN: {
      const {interval} = state 
      
      const slowerInterval = getSlowerInterval(interval)
      if (interval !== slowerInterval) {
        return { ...state, interval: slowerInterval }
      } else {
        return state
      }
    }
}
}

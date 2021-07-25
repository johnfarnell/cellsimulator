import { CellValues } from "../state/cellValues"

export const START = "START"
export const STOP = "STOP"
export const NUMBER_OF_ROWS = "NUMBER_OF_ROWS"
export const NUMBER_OF_COLS = "NUMBER_OF_COLS"
export const ACTIVATE_CELL = "ACTIVATE_CELL"
export const UPDATE_CELLS = "UPDATE_CELLS"

export type Start = {
  type: typeof START
}
export type Stop = {
  type: typeof STOP
}
export type NumberOfRows = {
  type: typeof NUMBER_OF_ROWS
  numberOfRows: number
}
export type NumberOfCols = {
  type: typeof NUMBER_OF_COLS
  numberOfCols: number
}
export type ActivateCell = {
  type: typeof ACTIVATE_CELL
  payload: {
    key: string
    activate: boolean
  }
}
export type UpdateCells = {
  type: typeof UPDATE_CELLS
  cellValues: CellValues
}

export type Action = Start | Stop | NumberOfCols | NumberOfRows | ActivateCell | UpdateCells



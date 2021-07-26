import { CellValues } from "../state/cellValues"

export const START = "START"
export const STOP = "STOP"
export const REPEAT = "REPEAT"
export const NUMBER_OF_ROWS = "NUMBER_OF_ROWS"
export const NUMBER_OF_COLS = "NUMBER_OF_COLS"
export const ACTIVATE_CELL = "ACTIVATE_CELL"
export const UPDATE_CELLS = "UPDATE_CELLS"
export const SPEED_UP = "SPEED_UP"
export const SLOW_DOWN = "SLOW_DOWN"

export type Start = {
  type: typeof START
}
export type Stop = {
  type: typeof STOP
  keep: boolean
}
type ActionRepeat = {
  type: typeof REPEAT
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
export type SpeedUp = {
  type: typeof SPEED_UP
}
export type SlowDown = {
  type: typeof SLOW_DOWN
}
export type UpdateCells = {
  type: typeof UPDATE_CELLS
  cellValues: CellValues
}

export type Action = Start | Stop | NumberOfCols | NumberOfRows | ActivateCell | UpdateCells | ActionRepeat | SpeedUp | SlowDown



import calcNextGeneration from "../generator/calcNextGeneration"
import { isEqualToInitialValues, isEqual } from "./cellValues"
import { State } from "./reducer";
import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, REPEAT, START, STOP, UPDATE_CELLS } from "../actions/actiontypes";
import { Dispatch } from "react";

export const postNextGenerateAction =  (state: State ): Action => {
  const { cellValues, numberOfRows, numberOfCols } = state
  const cellValuesNew = calcNextGeneration(cellValues, numberOfRows, numberOfCols)
  console.log({cellValuesNew})
  if (isEqualToInitialValues(cellValuesNew) || isEqual(cellValuesNew, cellValues)) {
    return {
      type: STOP,
      keep: !isEqualToInitialValues(cellValuesNew)
    }
  } else {
    return {
      type: UPDATE_CELLS,
      cellValues: cellValuesNew
    }
  }
}

export const setNumberOfRows = (dispatch: Dispatch<Action>) =>
  (numberOfRows: number) => dispatch({
    type: NUMBER_OF_ROWS,
    numberOfRows
  })
export const setNumberOfCols = (dispatch: Dispatch<Action>) =>
  (numberOfCols: number) => dispatch({
    type: NUMBER_OF_COLS,
    numberOfCols
  })

export const setStart = (dispatch: Dispatch<Action>) =>
  () => dispatch({
    type: START
  })

export const setStop = (dispatch: Dispatch<Action>) =>
  (keep: boolean) => dispatch({
    type: STOP,
    keep
  })

export const setRepeat = (dispatch: Dispatch<Action>) =>
  () => dispatch({
    type: REPEAT
  })

export const activateCell = (dispatch: Dispatch<Action>) => (key: string, active: boolean) =>
  () => {
    console.log({activateCell: active})
    dispatch({
      type: ACTIVATE_CELL,
      payload: {
        key,
        activate: !active
      }
    })

  }



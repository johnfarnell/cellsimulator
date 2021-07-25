import * as _ from "lodash";
export type CellValues = {
  [key: string]: boolean;
}
export const initCellValues: CellValues = {}

export const isActive = (key: string, cellValues: CellValues) => cellValues[key] ? cellValues[key] : false

export const isEqualToInitialValues = (cellValues: CellValues) =>  isEqual(cellValues, initCellValues)
export const isEqual = (cellValues1: CellValues, cellValues2: CellValues) =>  _.isEqual(cellValues1, cellValues2)

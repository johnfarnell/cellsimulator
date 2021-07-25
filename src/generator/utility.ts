import { CellValues } from "../state/cellValues";

export const deriveValue = (activeNeighbourCount: number, currentlyActive: boolean) : boolean => {
  if (currentlyActive) {
    return ((activeNeighbourCount === 2) || (activeNeighbourCount === 3))
  } else {
    return activeNeighbourCount === 3
  }
}

export const getTargetKey = (row: number, col: number, numberOfRows: number, numberOfCols: number) : string => {
  //Use the modulus operator to find the row to allow for wrapping for cells outside of the board
  let targetRow = (row + numberOfRows)%numberOfRows
  let targetCol = (col + numberOfCols)%numberOfCols

  return deriveKey(targetRow, targetCol)
}

export const deriveKey = (row: number, col: number) : string => {
  return `${row}_${col}`
}

export const getValue = (row: number, col: number, cellValues: CellValues): boolean => {
  const key = deriveKey(row, col)
  return cellValues[key] ? cellValues[key] : false;
}

export const initialisedRowsOfCells = (numberOfRows: number, numberOfCols: number): string[][] => {
    //This function provides a 2 dimensonal array of the rows and cols to drive the cell building - see Cell
    const cols = (rowid: number) => {
      const cols: string[] = []
      for (let i = 0; i < numberOfCols; i++) {
        cols.push(deriveKey(rowid, i))
      }
      return cols
    }
    const rows: string[][] = []
    for (let i = 0; i < numberOfRows; i++) {
      rows.push(cols(i))
    }
    return rows
}
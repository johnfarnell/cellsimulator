import { CellValues, isActive } from "../state/cellValues";

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

export const getRowCol = (key: string) : {row: number, col: number} => {
  return { 
    row: Number(key.substr(0, key.indexOf("_"))), 
    col: Number(key.substr(key.indexOf("_") + 1)) 
  }

}

export const getValue = (row: number, col: number, cellValues: CellValues): boolean => {
  const key = deriveKey(row, col)
  return isActive(key, cellValues);
}

export const deriveNeighbourKeys = (key: string): string[] => {
    //This function provides a 2 dimensonal array of the rows and cols to drive the cell building - see Cell
    const {row, col} = getRowCol(key)
    return initialisedRowsOfCellsBorder(row-1, row+2, col-1,col+2, [key])
  }

  export const initialisedRowsOfCells = (numberOfRows: number, numberOfCols: number): string[] => {
    return initialisedRowsOfCellsBorder(0, numberOfRows, 0, numberOfCols, [])
  }

  export const initialisedRowsOfCellsBorder = (
    startRow: number, endRow: number,  startCol: number, endCol: number, ignoreKeys: string[] = []): string[] => {
    //This function provides a 2 dimensonal array of the rows and cols to drive the cell building - see Cell
    const cols = (rowid: number) => {
      const cols: string[] = []
      for (let i = startCol; i < endCol; i++) {
        const key = deriveKey(rowid, i)
        ignoreKeys.indexOf(key) < 0 && cols.push(key)
      }
      return cols
    }
    let rows: string[] = []
    for (let i = startRow; i < endRow; i++) {
      rows = rows.concat(cols(i))
    }
    return rows
  }
import { CellValues, isActive } from "../state/cellValues"
import { deriveValue, getTargetKey, initialisedRowsOfCellsBorder, deriveNeighbourKeys, getRowCol } from "./utility"

const calcNextGeneration = (cellValues: CellValues, numberOfRows: number, numberOfCols: number) : CellValues => {
//   - When the next generation is running:
//   - A Cell with fewer than two live neighbours dies of under-population.
//   - A Cell with 2 or 3 live neighbours lives on to the next generation.
//   - A Cell with more than 3 live neighbours dies of overcrowding.
//   - An empty Cell with exactly 3 live neighbours "comes to life".
//   - A Cell who "comes to life" outside the board should wrap at the other side of the board.
//   - Once the next generation is done, User can trigger "next generation" again.

    const cellValuesNew = initialisedRowsOfCellsBorder(-1, numberOfRows + 1, -1, numberOfCols + 1)
    const cellValuesNext : CellValues = {}

    cellValuesNew.forEach( (key: string) => {
      const active = isActive(key, cellValues)
      const activeNeighbourCount = deriveNeighbourKeys(key).filter(neighbourKey =>isActive(neighbourKey, cellValues)).length
      if (deriveValue(activeNeighbourCount, active)) {
         const {row, col} = getRowCol(key)
         cellValuesNext[getTargetKey(row, col,numberOfRows, numberOfCols)] = true
      }
    })

    return cellValuesNext
}

export default calcNextGeneration


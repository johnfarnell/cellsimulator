import { CellValues } from "../state/cellValues"
import { deriveValue, getTargetKey, getValue } from "./utility"

const calcNextGeneration = (cellValues: CellValues, numberOfRows: number, numberOfCols: number) : CellValues => {
//   - When the next generation is running:
//   - A Cell with fewer than two live neighbours dies of under-population.
//   - A Cell with 2 or 3 live neighbours lives on to the next generation.
//   - A Cell with more than 3 live neighbours dies of overcrowding.
//   - An empty Cell with exactly 3 live neighbours "comes to life".
//   - A Cell who "comes to life" outside the board should wrap at the other side of the board.
//   - Once the next generation is done, User can trigger "next generation" again.

    const cellValuesNext : CellValues = {}

    for (let row = -1; row <= numberOfRows; row++) {
      for (let col = -1; col <= numberOfCols; col++) {
        const active =  getValue(row, col, cellValues)
        //count the active neighbours
        let activeNeighbourCount = 0
        for (let neighbourRow = row - 1; neighbourRow <= row + 1;  neighbourRow++) {
          for (let neighbourCol = col - 1; neighbourCol <= col + 1;  neighbourCol++) {
            if((row === neighbourRow) && (col === neighbourCol)) continue
            const neighbourActive = getValue(neighbourRow, neighbourCol, cellValues)
            if (neighbourActive) {
              activeNeighbourCount += 1
            }
          }
        }
      
        const targetActive = deriveValue(activeNeighbourCount, active)
        if (targetActive) {
          const targetKey = getTargetKey(row, col,numberOfRows, numberOfCols)
          cellValuesNext[targetKey] = true
        }
      }
    }

    return cellValuesNext;
}

export default calcNextGeneration


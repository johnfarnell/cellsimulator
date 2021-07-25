import { CellValues } from '../state/cellValues'
import  calcNextGeneration from './calcNextGeneration'
describe('Tests for the calcNextGeneration', () => {
  
  it('should handle matches of 3', () => {
    const cellValues: CellValues = {
      "3_2": true,
      "3_3": true,
      "3_1": true
    }
    console.log({here: calcNextGeneration(cellValues, 5, 5)})
    expect(calcNextGeneration(cellValues, 5, 5)).toEqual({ '2_2': true, '3_2': true, '4_2': true })
  })
  it('should handle matches of 2', () => {
    const cellValues: CellValues = {
      "3_2": true,
      "3_3": true,
      "4_3": true
    }
    console.log({herex: calcNextGeneration(cellValues, 5, 5)})
    expect(calcNextGeneration(cellValues, 5, 5)).toEqual({ '3_2': true, '3_3': true, '4_2': true, '4_3': true })
  })
})


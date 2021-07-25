import { CellValues } from '../state/cellValues'
import  calcNextGeneration from './calcNextGeneration'
describe('Tests for the calcNextGeneration', () => {
  
  // it('should handle matches of 3', () => {
  //   const cellValues: CellValues = {
  //     "3_2": true,
  //     "3_3": true,
  //     "3_1": true
  //   }
  //   expect(calcNextGeneration(cellValues, 5, 5)).toEqual({ '2_2': true, '3_2': true, '4_2': true })
  // })
  // it('should handle matches of 2', () => {
  //   const cellValues: CellValues = {
  //     "3_2": true,
  //     "3_3": true,
  //     "4_3": true
  //   }
  //   expect(calcNextGeneration(cellValues, 5, 5)).toEqual({ '3_2': true, '3_3': true, '4_2': true, '4_3': true })
  // })
  it('should handle the example at https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg', () => {
    const cellValues: CellValues = {
      "1_2": true,
      "2_3": true,
      "3_3": true,
      "3_2": true,
      "3_1": true
    }
    const first = calcNextGeneration(cellValues, 6, 6)
    const second = calcNextGeneration(first, 6, 6)
    const third = calcNextGeneration(second, 6, 6)
    const fourth = calcNextGeneration(third, 6, 6)
    expect(first).toEqual({ '2_1': true, '2_3': true, '3_2': true, '3_3': true, '4_2': true })
    expect(second).toEqual({ '3_1': true, '4_2': true, '4_3': true, '3_3': true, '2_3': true })
    expect(third).toEqual({ '2_2': true, '3_3': true, '3_4': true, '4_3': true, '4_2': true })
    expect(fourth).toEqual({ '2_3': true, '3_4': true, '4_4': true, '4_3': true, '4_2': true })
  })

  it('should handle the edge case', () => {
    const cellValues: CellValues = {
      "0_1": true,
      "0_2": true,
      "0_3": true
    }
    expect(calcNextGeneration(cellValues, 6, 6)).toEqual({ '0_2': true, '1_2': true, '5_2': true })
  })
  it('should handle the single cell', () => {
    const cellValues: CellValues = {
      "4_2": true,
    }
    expect(calcNextGeneration(cellValues, 6, 6)).toEqual({})
  })
})


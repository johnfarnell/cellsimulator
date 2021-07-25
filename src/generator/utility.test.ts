import { deriveValue, deriveKey, getValue, initialisedRowsOfCells, getTargetKey } from './utility'
describe('Tests for the deriveValue in the utility', () => {
  it('should return TRUE when active and 2 neighbours', () => {
    const activeNeighbourCount = 2
    const currentlyActive = true
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(true)
  })

  it('should return TRUE when active and 3 neighbours', () => {
    const activeNeighbourCount = 3
    const currentlyActive = true
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(true)
  })

  it('should return FALSE when active and 1 neighbours', () => {
    const activeNeighbourCount = 1
    const currentlyActive = true
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(false)
  })

  it('should return FALSE when active and 4 neighbours', () => {
    const activeNeighbourCount = 4
    const currentlyActive = true
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(false)
  })

  it('should return TRUE when not active and 3 neighbours', () => {
    const activeNeighbourCount = 3
    const currentlyActive = false
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(true)
  })

  it('should return FALSE when not active and 2 neighbours', () => {
    const activeNeighbourCount = 2
    const currentlyActive = false
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(false)
  })

  it('should return FALSE when not active and 4 neighbours', () => {
    const activeNeighbourCount = 4
    const currentlyActive = false
    expect(deriveValue(activeNeighbourCount, currentlyActive)).toBe(false)
  })

})

describe('Tests for the deriveKey in the utility', () => {
  it('should return correct key for row and col when single digit', () => {
    expect(deriveKey(1, 2)).toEqual('1_2')
  })
  it('should return correct key for row and col when single digit', () => {
    expect(deriveKey(53, 27)).toEqual('53_27')
  })
})

describe('Tests for the getValue in the utility', () => {
  const cellValues = { "1_2": true, "6_9": false }
  it('should return true for an active cell', () => {
    expect(getValue(1, 2, cellValues)).toBe(true)
  })
  it('should  return false for an inactive cell', () => {
    expect(getValue(6, 9, cellValues)).toBe(false)
  })
  it('should  return false for an undefined cell', () => {
    expect(getValue(24, 6, cellValues)).toBe(false)
  })
})

describe('Tests for the initialisedRowsOfCells in the utility', () => {

  it('should return an array matching the number of rows and cols', () => {
    const rowsAndCols = initialisedRowsOfCells(4, 6)
    expect(rowsAndCols).toHaveLength(4)
    expect(rowsAndCols[0]).toHaveLength(6)
    expect(rowsAndCols[1]).toHaveLength(6)
    expect(rowsAndCols[2]).toHaveLength(6)
    expect(rowsAndCols[3]).toHaveLength(6)

    //pick a random cell to check
    expect(rowsAndCols[2][4]).toEqual("2_4")
  })
})

describe('Tests for the getTargetKey in the utility', () => {
  it('should return the same target key if the row/col exist in the cells', () => {
    const key = getTargetKey(4, 6, 8, 9)
    expect(key).toBe('4_6')
  })
  it('should return the same target key if the row/col exist on the right edge of the cells', () => {
    const key = getTargetKey(4, 6, 8, 7)
    expect(key).toBe('4_6')
  })
  it('should return the same target key if the row/col exist on the left edge of the cells', () => {
    const key = getTargetKey(4, 0, 8, 7)
    expect(key).toBe('4_0')
  })
  it('should return the same target key if the row/col exist on the top edge of the cells', () => {
    const key = getTargetKey(0, 5, 8, 7)
    expect(key).toBe('0_5')
  })
  it('should return the same target key if the row/col exist on the bottom edge of the cells', () => {
    const key = getTargetKey(7, 5, 8, 7)
    expect(key).toBe('7_5')
  })
  it('should return the a wrapped target key if the row/col is beyond  the bottom edge of the cells', () => {
    const key = getTargetKey(8, 5, 8, 7)
    expect(key).toBe('0_5')
  })
  it('should return the a wrapped target key if the row/col is beyond  the top edge of the cells', () => {
    const key = getTargetKey(-1, 5, 8, 7)
    expect(key).toBe('7_5')
  })
  it('should return the a wrapped target key if the row/col is beyond  the left edge of the cells', () => {
    const key = getTargetKey(4, -1, 8, 7)
    expect(key).toBe('4_6')
  })
  it('should return the a wrapped target key if the row/col is beyond  the right edge of the cells', () => {
    const key = getTargetKey(4, 7, 8, 7)
    expect(key).toBe('4_0')
  })
})

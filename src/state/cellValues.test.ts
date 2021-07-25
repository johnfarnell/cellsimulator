import { isActive, isEqual, isEqualToInitialValues } from './cellValues'
describe('Tests for the isActive in the CellValues', () => {
  const cellValues = { "1_2": true, "16_22": false }
  it('should return TRUE when key exists and is set to TRUE', () => {
    expect(isActive('1_2', cellValues)).toBe(true)
  })
  it('should return FALSE when key exists and is set to FALSE', () => {
    expect(isActive('16_22', cellValues)).toBe(false)
  })
  it('should return FALSE when key is not defined', () => {
    expect(isActive('1_22', cellValues)).toBe(false)
  })
})
describe('Tests for the isEqualToInitialValues in the CellValues', () => {
  const cellValues = { "1_2": true, "16_22": false }
  it('should return TRUE when matches initialValues', () => {
    expect(isEqualToInitialValues({})).toBe(true)
  })
  it('should return FALSE when not matches initialValues', () => {
    expect(isEqualToInitialValues({"1_2": true})).toBe(false)
  })
})
describe('Tests for the isEqualToInitialValues in the CellValues', () => {
  const cellValues = { "1_2": true, "16_22": false }
  it('should return TRUE when 2 values match', () => {
    expect(isEqual( { "1_2": true, "16_22": false }, cellValues)).toBe(true)
  })
  it('should return FALSE when 2 values match', () => {
    expect(isEqual({"1_2": true}, cellValues)).toBe(false)
  })
})

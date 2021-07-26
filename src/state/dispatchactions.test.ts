
import { Dispatch } from 'react'
import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, REPEAT, SLOW_DOWN, SPEED_UP, START, STOP, UPDATE_CELLS } from '../actions/actiontypes'
import { postNextGenerateAction, setNumberOfCols, setNumberOfRows, activateCell, setStart, setStop, setRepeat, speedUp, slowDown } from './dispatchactions'
import { State } from './reducer'

describe('Tests for the postNextGenerateAction', () => { 
  it('should return STOP when next generation is empty', () => {
    const state: State = {
      cellValues: { "1_9": true, "1_22": true },
      lastRunCellValues: {},
      numberOfRows: 25,
      numberOfCols: 25,
      started: true,
      interval: 2000
    }
    const result = postNextGenerateAction(state)
    expect(result).toEqual({
      type: STOP,
      keep: false
    })
  })

  it('should return UPDATE_CELLS when next generation is not empty', () => {
    const state: State = {
      cellValues: { "1_9": true, "1_10": true, "1_11": true },
      lastRunCellValues: {},
      numberOfRows: 25,
      numberOfCols: 25,
      started: true,
      interval: 2000
    }
    const result = postNextGenerateAction(state)
    expect(result).toEqual({
      type: UPDATE_CELLS,
      cellValues: {  "0_10": true, "1_10": true, "2_10": true }
    })
  })

})

describe('Tests for the setNumberOfCols', () => { 
  it('should dispatch the NUMBER_OF_COLS action with the correct columns', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setNumberOfCols(dispatch)(6)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: NUMBER_OF_COLS,
      numberOfCols: 6
    })
  })
})

describe('Tests for the setNumberOfRows', () => { 
  it('should dispatch the NUMBER_OF_ROWS action with the correct rows', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setNumberOfRows(dispatch)(6)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: NUMBER_OF_ROWS,
      numberOfRows: 6
    })
  })
})

describe('Tests for the setStop', () => { 
  it('should dispatch the STOP action and keep is TRUE', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setStop(dispatch)(true)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: STOP,
      keep: true
    })
  })
  it('should dispatch the STOP action and keep is FALSE', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setStop(dispatch)(false)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: STOP,
      keep: false
    })
  })
})

describe('Tests for the setStart', () => { 
  it('should dispatch the START action', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setStart(dispatch)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: START
    })
  })
})

describe('Tests for the setRepeat', () => { 
  it('should dispatch the REPEAT action', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    setRepeat(dispatch)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: REPEAT
    })
  })
})

describe('Tests for the activateCell', () => { 
  it('should dispatch the ACTIVATE_CELL action and toggle the activate value ', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    activateCell(dispatch)("1_2", true)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ACTIVATE_CELL, 
      payload: {
        key: "1_2",
        activate: false
      }
    })
  })
})

describe('Tests for the speed up', () => { 
  it('should dispatch the SPEED_UP action ', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    speedUp(dispatch)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: SPEED_UP
    })
  })
})


describe('Tests for the speed up', () => { 
  it('should dispatch the SLOW_DOWN action ', () => {
    const dispatch: Dispatch<Action> = jest.fn()
    slowDown(dispatch)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: SLOW_DOWN
    })
  })
})


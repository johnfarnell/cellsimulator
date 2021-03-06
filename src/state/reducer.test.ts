import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, REPEAT, SLOW_DOWN, SPEED_UP, START, STOP, UPDATE_CELLS } from "../actions/actiontypes";
import { initCellValues } from "./cellValues";
import { intervals, reducer, State, getFasterInterval, getSlowerInterval, isQuickestInterval, isSlowestInterval } from "./reducer";

const state: State = {
  started: false,
  numberOfRows: 10,
  numberOfCols: 10,
  lastRunCellValues: {"4_3": true},
  cellValues: {
    'key1': true
  },
  interval: 2000
}
describe ('Tests for the getFasterInterval', ()=> {
  it('should set return the next faster interval', () => {
    expect(getFasterInterval( intervals[1])).toEqual(intervals[2])
  })
  it('should set return the same interval if it is the fastest already', () => {
    expect(getFasterInterval( intervals[intervals.length-1])).toEqual(intervals[intervals.length-1])
  })

})

describe ('Tests for the getSlowerInterval', ()=> {
  it('should set return the next slowest interval', () => {
    expect(getSlowerInterval(intervals[2])).toEqual(intervals[1])
  })
  it('should set return the same interval if it is the slowest already', () => {
    expect(getSlowerInterval(intervals[0])).toEqual(intervals[0])
  })
})

describe ('Tests for the isQuickestInterval', ()=> {
  it('should recognise the quickest interval', () => {
    expect(isQuickestInterval(intervals[intervals.length-1])).toEqual(true)
  })
  it('should recognise NOT the quickest interval', () => {
    expect(isQuickestInterval(intervals[intervals.length-2])).toEqual(false)
  })

})

describe ('Tests for the isSlowestInterval', ()=> {
  it('should recognise the slowest interval', () => {
    expect(isSlowestInterval(intervals[0])).toEqual(true)
  })
  it('should recognise NOT the slowest interval', () => {
    expect(isSlowestInterval(intervals[1])).toEqual(false)
  })

})

describe ('Tests for the reducer', ()=> {
    it('should set "started" to true for Action: START', () => {
      const activeState = {...state, started: false}
      const action: Action = {
        type: START
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: true, lastRunCellValues: {...state.cellValues}})
    })
    
    it('should set "started" to false for Action: STOP and keep cellValues', () => {
      const activeState = {...state, started: true}
      const action: Action = {
        type: STOP,
        keep: true
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: false })
    })
    
    it('should set "started" to false for Action: STOP and NOT keep cellValues', () => {
      const activeState = {...state, started: true}
      const action: Action = {
        type: STOP,
        keep: false
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: false, cellValues: initCellValues })
    })
    
    it('should set "started" to TRUE for Action: REPEAT and refresh cellValues from lastrun', () => {
      const activeState = {...state, started: true}
      const action: Action = {
        type: REPEAT
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: true, cellValues: state.lastRunCellValues })
    })
    
    it('should set "numberOfCols" to assigned value for Action: NUMBER_OF_COLS', () => {
      const activeState = {...state, numberOfCols: 2}
      const action: Action = {
        type: NUMBER_OF_COLS,
        numberOfCols: 20
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {}, numberOfCols: 20})
    })
    
    it('should set "numberOfRows" to assigned value for Action: NUMBER_OF_ROWS', () => {
      const activeState = {...state, numberOfRows: 2}
      const action: Action = {
        type: NUMBER_OF_ROWS,
        numberOfRows: 20
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {}, numberOfRows: 20})
    })
    
    it('should activate a non-existing cell for Action: ACTIVATE_CELL', () => {
      const activeState = { ...state }
      const action: Action = {
        type: ACTIVATE_CELL,
        payload: {
          key: 'key1',
          activate: true
        }
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {...activeState.cellValues, key1: true}})
    })
    
    it('should activate an existing cell for Action: ACTIVATE_CELL', () => {
      const activeState = { ...state, cellValues: {key1: false} }
      const action: Action = {
        type: ACTIVATE_CELL,
        payload: {
          key: 'key1',
          activate: true
        }
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {...activeState.cellValues, key1: true}})
    })
    
    it('should inactivate a non-existing cell for Action: ACTIVATE_CELL', () => {
      const activeState = { ...state }
      const action: Action = {
        type: ACTIVATE_CELL,
        payload: {
          key: 'key1',
          activate: false
        }
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {...activeState.cellValues, key1: false}})
    })
    
    it('should inactivate an existing cell for Action: ACTIVATE_CELL', () => {
      const activeState = { ...state, cellValues: {key1: true} }
      const action: Action = {
        type: ACTIVATE_CELL,
        payload: {
          key: 'key1',
          activate: false
        }
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {...activeState.cellValues, key1: false}})
    })
    
    it('should update the cellValues for Action: UPDATE_CELLS', () => {
      const activeState = { ...state, cellValues: {key1: true, key2: false }}
      const action: Action = {
        type: UPDATE_CELLS,
        cellValues: {key1: false, key2: true, key3: false, key4: true }
      }
      expect(reducer(activeState, action)).toEqual({...activeState, cellValues: {...action.cellValues }})
    })
      
    it('should decrease the Timeout Interval for Action: SPEED_UP', () => {
      const activeState = { ...state, interval: intervals[2] }
      const action: Action = {
        type: SPEED_UP,
       }
      expect(reducer(activeState, action)).toEqual({...activeState, interval: intervals[3]} )
    })
      
    it('should not change the Timeout Interval when at MAX speed for Action: SPEED_UP', () => {
      const activeState = { ...state, interval: intervals[intervals.length -1] }
      const action: Action = {
        type: SPEED_UP,
       }
      expect(reducer(activeState, action)).toEqual({...activeState} )
    })
      
    it('should increase the Timeout Interval for Action: SLOW_DOWN', () => {
      const activeState = { ...state, interval: intervals[2]  }
      const action: Action = {
        type: SLOW_DOWN,
       }
      expect(reducer(activeState, action)).toEqual({...activeState, interval: intervals[1] } )
    })
      
    it('should not change the Timeout Interval when at MIN speed for Action: SLOW_DOWN', () => {
      const activeState = { ...state, interval: intervals[0]  }
      const action: Action = {
        type: SLOW_DOWN,
       }
      expect(reducer(activeState, action)).toEqual({...activeState} )
    })
})
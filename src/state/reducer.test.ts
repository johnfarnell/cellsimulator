import { Action, ACTIVATE_CELL, NUMBER_OF_COLS, NUMBER_OF_ROWS, START, STOP, UPDATE_CELLS } from "../actions/actiontypes";
import { reducer, State } from "./reducer";

const state: State = {
  started: false,
  numberOfRows: 10,
  numberOfCols: 10,
  cellValues: {
    'key1': true
  }
}

describe ('Tests for the reducer', ()=> {
    it('should set "started" to true for Action: START', () => {
      const activeState = {...state, started: false}
      const action: Action = {
        type: START
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: true})
    })
    
    it('should set "started" to false for Action: STOP', () => {
      const activeState = {...state, started: true}
      const action: Action = {
        type: STOP
      }
      expect(reducer(activeState, action)).toEqual({...activeState, started: false})
    })
    
    it('should set "numberOfCols" to assigned value for Action: NUMBER_OF_COLS', () => {
      const activeState = {...state, numberOfCols: 2}
      const action: Action = {
        type: NUMBER_OF_COLS,
        numberOfCols: 20
      }
      expect(reducer(activeState, action)).toEqual({...activeState, numberOfCols: 20})
    })
    
    it('should set "numberOfRows" to assigned value for Action: NUMBER_OF_ROWS', () => {
      const activeState = {...state, numberOfRows: 2}
      const action: Action = {
        type: NUMBER_OF_ROWS,
        numberOfRows: 20
      }
      expect(reducer(activeState, action)).toEqual({...activeState, numberOfRows: 20})
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
   
})
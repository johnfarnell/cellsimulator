import ControlLine, { ControlLineWrapper } from "./ControlLine";
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('Testing the ControlLine Component', () => {
  it('should have a property of started on the outer wrapper', () => {
    const component = renderer.create(
      <ControlLine 
          setNumberOfRows={jest.fn()}
          setNumberOfCols={jest.fn()}
          started={false}
          startable={true}
          setStart={jest.fn()}
          setRepeat={jest.fn()}
          repeatable={false}
          setStop={jest.fn()}
          numberOfRows={20}
          numberOfCols={30}
          speedUp={jest.fn()}
          slowDown={jest.fn()}
          slowestInterval={false}
          quickestInterval={false}
       />
    )   
    const instance = component.root 
    
    const controlLineWrapper = instance.findByType(ControlLineWrapper)
    expect(controlLineWrapper.props).toBeDefined()
    expect(controlLineWrapper.props.started).toEqual(false)
  })

  it('should have a START button which triggers the setStart on an onClick event', () => {

    const setStart = jest.fn()
    const started = false
    const component = renderer.create(
      <ControlLine 
          setNumberOfRows={jest.fn()}
          setNumberOfCols={jest.fn()}
          started={false}
          startable={true}
          setStart={setStart}
          setRepeat={jest.fn()}
          repeatable={false}
          setStop={jest.fn()}
          numberOfRows={20}
          numberOfCols={30}
          speedUp={jest.fn()}
          slowDown={jest.fn()}
          slowestInterval={false}
          quickestInterval={false}
      />
    )   
    const instance = component.root 
    
    const controlLineWrapper = instance.findByType(ControlLineWrapper)
    const buttons = controlLineWrapper.findAllByType('button')
    
    expect(controlLineWrapper.props).toBeDefined()
    expect(controlLineWrapper.props.started).toEqual(started)
    expect(buttons).toBeDefined()
    expect(buttons).toHaveLength(6)
    expect(buttons[0].props.children).toEqual('Start')
    expect(buttons[0].props.disabled).toEqual(false)

    buttons[0].props.onClick()
    expect(setStart).toHaveBeenCalled()
  })

  it('should have a NumberOfRows input text which triggers the setNumberOfRows on an onChange event', () => {
    const setNumberOfRows = jest.fn()
    const component = renderer.create(
      <ControlLine 
        setNumberOfRows={setNumberOfRows}
        setNumberOfCols={jest.fn()}
        started={false}
        startable={true}
        setStart={jest.fn()}
        setRepeat={jest.fn()}
        repeatable={false}
        setStop={jest.fn()}
        numberOfRows={20}
        numberOfCols={30}
        speedUp={jest.fn()}
        slowDown={jest.fn()}
        slowestInterval={false}
        quickestInterval={false}
      />
    )   
    const instance = component.root 
    
    const controlLineWrapper = instance.findByType(ControlLineWrapper)
    const texts = controlLineWrapper.findAllByType('input')
    expect(texts).toBeDefined()
    expect(texts).toHaveLength(2)
    expect(texts[0].props.disabled).toEqual(false)
    expect(texts[0].props.value).toEqual(20)

    texts[0].props.onChange({target:{value: '35'}})
    
    expect(texts[0].props.value).toEqual(20)
    expect(setNumberOfRows).toHaveBeenCalledWith(35)
  })


})
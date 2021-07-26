import Cell, { CellWrapper } from "./Cell";
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('Testing the Cell Component', () => {
    it('should have a visible active "dot" image when active and no activate function is available', () => {
      const component = renderer.create(
        <Cell active={true}/>
      )   

      const json = component.toJSON()
      expect(json).toHaveStyleRule( 'max-width', '15px')
      expect(json).toBeVisible
      const instance = component.root 
      
      const img = instance.findByType('img')
      expect(img).toBeDefined()
      expect(img.props.src).toEqual('dot.png')
      expect(img.props.alt).toEqual('dot')
    })

    it('should not be visible when NOT active and no activate function is available', () => {
      const component = renderer.create(
        <Cell active={false}/>
      )   
      const json = component.toJSON()
      expect(json).toHaveStyleRule( 'max-width', '15px')
     
      const instance = component.root 
 
      const img = instance.findAllByType('img')
      expect(img).toHaveLength(0)
    })

    it('should be visible when active and activate function is available', () => {
      const activate = jest.fn()
      const component = renderer.create(
        <Cell active={true} activate={activate}/>
      )   
      const json = component.toJSON()
      expect(json).toHaveStyleRule( 'max-width', '15px')

      const instance = component.root 
            
      const props = instance.findByType('input').props
      expect(props.type).toEqual('checkbox')
      expect(props.checked).toEqual(true)

      expect(activate).toHaveBeenCalledTimes(0)
      props.onChange()
      expect(activate).toHaveBeenCalledWith(false)
    })


    it('should be visible when NOT active and activate function is available', () => {
      const activate = jest.fn()
      const component = renderer.create(
        <Cell active={false} activate={activate}/>
      )   
      const json = component.toJSON()
      expect(json).toHaveStyleRule( 'max-width', '15px')
     
      const instance = component.root 
      
      const props = instance.findByType('input').props
      expect(props.type).toEqual('checkbox')
      expect(props.checked).toEqual(false)

      expect(activate).toHaveBeenCalledTimes(0)
      props.onChange()
      expect(activate).toHaveBeenCalledWith(true)
    })
})
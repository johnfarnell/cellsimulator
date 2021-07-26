import { GridHeading } from "./GridHeading";
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe('Testing the GridHeading Component', () => {
    it('should have all the GridHeading styleprops set', () => {
      const component = renderer.create(
        <GridHeading />
      )   
      const json = component.toJSON()
      
      expect(json).toHaveStyleRule('justify-content', 'center')
      expect(json).toHaveStyleRule('display', 'flex')
      expect(json).toHaveStyleRule('text-decoration', 'black')
      expect(json).toHaveStyleRule('font-size', 'larger')
      expect(json).toHaveStyleRule('font-weight', 'bold')
    })
})
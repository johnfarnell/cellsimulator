import { GridContainer } from "./GridContainer";
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe('Testing the GridContainer Component', () => {
    it('should have all the grid row and col properties set', () => {
      const component = renderer.create(
        <GridContainer rowStart={2} rowEnd={3} colStart={5} colEnd={9} />
      )   
      const json = component.toJSON()
      
      expect(json).toHaveStyleRule('grid-row-start', '2')
      expect(json).toHaveStyleRule('grid-row-end', '3')
      expect(json).toHaveStyleRule('grid-column-start', '5')
      expect(json).toHaveStyleRule('grid-column-end', '9')
    })
})
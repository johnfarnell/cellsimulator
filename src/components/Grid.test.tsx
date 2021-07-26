import { Grid } from "./Grid";
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe('Testing the Grid Component', () => {
    it('should have all the grid row and col properties set', () => {
      const component = renderer.create(
        <Grid rows={5} cols={7}/>
      )   
      const json = component.toJSON()
      
      expect(json).toHaveStyleRule('justify-content', 'center')
      expect(json).toHaveStyleRule('display', 'grid')
      expect(json).toHaveStyleRule('align-items', 'flex-start')
      expect(json).toHaveStyleRule('column-gap', '1px')
      expect(json).toHaveStyleRule('row-gap', '1px')
      expect(json).toHaveStyleRule('grid-template-rows', 'repeat(5,1fr)')
      expect(json).toHaveStyleRule('grid-template-columns', 'repeat(7,1fr)')
    })
})
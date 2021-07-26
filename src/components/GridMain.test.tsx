import { GridMain } from "./GridMain";
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe('Testing the GridMain Component', () => {
    it('should have all the GridMain styleprops set', () => {
      const component = renderer.create(
        <GridMain />
      )   
      const json = component.toJSON()
      
      expect(json).toHaveStyleRule('justify-content', 'center')
      expect(json).toHaveStyleRule('display', 'grid')
      expect(json).toHaveStyleRule('flex-direction', 'row')
      expect(json).toHaveStyleRule('column-gap', '5px')
      expect(json).toHaveStyleRule('grid-template-columns', '1fr auto auto auto 1fr')
    })
})
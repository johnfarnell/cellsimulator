import { GridFlex } from "./GridFlex";
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe('Testing the GridFlex Component', () => {
    it('should have all the GridFlex styleprops set', () => {
      const component = renderer.create(
        <GridFlex justifyContents={"left"} />
      )   
      const json = component.toJSON()
      
      expect(json).toHaveStyleRule('justify-content', 'left')
      expect(json).toHaveStyleRule('display', 'flex')
    })
})
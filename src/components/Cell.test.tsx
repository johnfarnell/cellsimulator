import Cell, { CellWrapper } from "./Cell";
import renderer from 'react-test-renderer'


describe('Testing the Cell Component', () => {
    it('should have an active, lightgreen button when active is TRUE', () => {
      const component = renderer.create(
        <Cell active={true}/>
      )   
      const instance = component.root 
      
      const cellWrapper = instance.findByType(CellWrapper)
      expect(cellWrapper.props).toBeDefined()
      expect(cellWrapper.props.active).toEqual(true)
    })

    // it('should have NOT an active prop, normal button when active is FALSE', () => {
    //    const component = renderer.create(
    //     <Cell active={false} />
    //   )   
    //   const instance = component.root 
      
    //   const cellWrapper = instance.findByType(CellWrapper)
    //   expect(cellWrapper.props).toBeDefined()
    //   expect(cellWrapper.props.active).toEqual(false)
    // })

    // it('should call with activate == true when NOT active and button is clicked' , () => {
    //   const mockActivate = jest.fn((activate: boolean)=> activate);
    //   const component = renderer.create(
    //     <Cell active={false} activate={mockActivate}/>
    //   )   
    //   const instance = component.root 
      
    //   const cellWrapper = instance.findByType(CellWrapper)
    //   const button = cellWrapper.findByType('button')
    //   button.props.onClick()
    //   expect(mockActivate).toHaveBeenCalledWith(true)

    // })

    // it('should call with activate == false when active and button is clicked' , () => {
    //   const mockActivate = jest.fn((activate: boolean)=> activate);
    //   const component = renderer.create(
    //     <Cell active={true} activate={mockActivate}/>
    //   )   
    //   const instance = component.root 
      
    //   const cellWrapper = instance.findByType(CellWrapper)
    //   const button = cellWrapper.findByType('button')
    //   button.props.onClick()
    //   expect(mockActivate).toHaveBeenCalledWith(false)
    // })

})
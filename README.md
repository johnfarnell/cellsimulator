# Cell Simulator

For a quick demonstration of the workings of this application, please copy the following 
link https://github.com/johnfarnell/cellsimulator/tree/dev and import at https://codesandbox.io/docs/importing
Alternatively, clone the github link  https://github.com/johnfarnell/cellsimulator/tree/dev to a local machine 
and use the standard "npm start" to run the application locally. Once the application has started in the terminal command prompt,
open a browser window and enter the URL http://localhost:3000

## Overview

The application has the following features

A Control line which allows the user to select the number of rows/columns they wish the cell simulator to operate in. 
There are 4 buttons which allow the simulator to be `started`, `stopped`, `repeated` and `cleared`. There are 2 further 
buttons which allows the cell simulator to `speed up` or `slow down` - see `Started Mode ON`

A Main Grid area shows visually which cells are active

### The simulator operates in 2 main modes

#### `Started Mode OFF`

In this mode the user can interact with the grid of cells `and change the number of rows and columns`. Once the desired combination of cells
is selected, the user can switch ON the simulator by pressing the `Start` button

<img width="737" alt="ModeOFF" src="https://user-images.githubusercontent.com/25125205/127062707-480f623a-17fb-4955-a1bd-8d37f9451947.png">

<img width="694" alt="ModeOFFSelected" src="https://user-images.githubusercontent.com/25125205/127063109-650e8c71-5f78-4c43-b770-abccf6085f13.png">


#### `Started Mode ON`

In this mode the user can no longer interact with the cells or change the number of rows and columns. The simulator will 
refresh the cells with the latest generation of cells based on the following rules

   ##### `- When the next generation is running`
   ##### `- A Cell with fewer than two live neighbours dies of under-population.`
   ##### `- A Cell with 2 or 3 live neighbours lives on to the next generation.`
   ##### `- A Cell with more than 3 live neighbours dies of overcrowding.`
   ##### `- An empty Cell with exactly 3 live neighbours "comes to life".`
   ##### `- A Cell who "comes to life" outside the board should wrap at the other side of the board.`
   ##### `- Once the next generation is done, User can trigger "next generation" again.`
   
Of particular note is the  idea that a cell `comes to life`. Look out for cells appearing on the opposite side of the board from 3 
or more cells that become active on the board's edge. Each active cell is represented as a black dot on the page, an inactive cell
is invisible.

<img width="631" alt="ModeON" src="https://user-images.githubusercontent.com/25125205/127063928-68dbd4c1-75ea-4061-9df8-0240119e05e9.png">


A simulation can either end with

   #### `the cell generation no longer changing the grid at all`
         All active cells remain active and no "dead/empty" cells come to life from one generation to the next
   #### `An Empty Grid`
         All cells are inactive 
   #### `The Grid running indefinitely`
         Patterns develop on the grid which go into a repeat cycle which will never see either of the scenarios above occur
         
In this MODE there is the possibility to `SPEED UP` (reduce the interval between) or `SLOW DOWN` (increase the interval between)
the creation of the cells's "next generation".
         
At any time, a simulation can be STOPPED via the `STOP` button. At this point the cell generation stops and the user can interact with the 
grid again, and, optionally, START, REPEAT or CLEAR the grid as they choose

## `Technical Design`

The application was developed using `React` with `typescript` and, in particular, the `styling-component` library. It has test 
cases for all the calculations around cell generation. 

I have used the `useReducer` function of `react` to hold the "state" of the application. There is a collection of actions which 
allow the components to interact with the applications state 

    export const START = "START"
    export const STOP = "STOP"
    export const REPEAT = "REPEAT"
    export const NUMBER_OF_ROWS = "NUMBER_OF_ROWS"
    export const NUMBER_OF_COLS = "NUMBER_OF_COLS"
    export const ACTIVATE_CELL = "ACTIVATE_CELL"
    export const UPDATE_CELLS = "UPDATE_CELLS"
    export const SPEED_UP = "SPEED_UP"
    export const SLOW_DOWN = "SLOW_DOWN"
    
Each of the above actions have a corresponding reducer which manipulate the state before triggering a re-render of the application. 

The cell generation is controlled within react's `useEffect` function which creates a timer set to run the algorithm
at configurable intervals as determined by the `Speed Up` and `Slow Down` features. 

At each interval the next generation of cells is presented a page of "active" black dots

The Cell Simulation's react components are developed using `styled-component`. This allowed for the dynamic setting of the grid rows 
and columns within which the cells were created.

The active/inactive nature of each cell is held in a simple map of values.
export type CellValues = {
  [key: string]: boolean;
}
A key of 'row_col" identifies a cell, e.g. row 3, column 10 has a key of "3_10" and, if it is active,
the cellValues will have the following appearance:
  
  `{"3_10: true ......}`
  
The calculation of the next generation of cells (algortihm) , along with other essential pieces of functionality, is handled 
in a separate function from the React Components.
  
There are extensive tests around the algorithm  - see `src\generator\calcNextGeneration.test.ts`. Included is a test to ensure
that the simulation at https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg is successful

## Testing

Unit testing is 100% on the cell calculations, actions and reducers. All Actions/reducers and algorithms have 100% coverage

## Future Enhancements

I would like to have added the facility to mark entire rows or columns as live(or dead) via some component. I also think it would be 
interesting to allow the user to predict whether the simulator will run indefinitely prior to starting the generation. It would also be useful 
to have somestandard configurations available for automatic selections instead of manually (de)selecting cells.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm coverage`

Launches the test runner in the interactive watch mode and provides coverage information\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

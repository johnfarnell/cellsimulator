# Getting Started this Cell Simulator

For a quick demonstration of the workings of this application, please copy the following link https://github.com/johnfarnell/cellsimulator/tree/dev and import at
https://codesandbox.io/docs/importing
Alternatively, clone the github link  https://github.com/johnfarnell/cellsimulator/tree/dev to a local machine and use the standard "npm start" to run the application locally

## Overview

The application has the following features

A Control line which allows the user to select the number of rows/columns they wish the cell simulator to operate in. There are 4 buttons which allow the simulator to 
be "started", "stopped:, "repeated" and "cleared"

A Main Grid area which shows visually which cells are active

### The simulator operates in 2 main modes

#### `Started Mode OFF`

In this mode the user can interact with the grid of cells and change the number of rows and columns. Once the desired combination of cells
is selected, the user can switch ON the simulator by pressing the start button

#### `Started Mode ON`

In this mode the user can no longer interact with the cells or change the number of rows and columns. In this mode the simulator will refresh the cells with the latest generation of cells based on the following rules
   ##### `- When the next generation is running`
   ##### `- A Cell with fewer than two live neighbours dies of under-population.`
   ##### `- A Cell with 2 or 3 live neighbours lives on to the next generation.`
   ##### `- A Cell with more than 3 live neighbours dies of overcrowding.`
   ##### `- An empty Cell with exactly 3 live neighbours "comes to life".`
   ##### `- A Cell who "comes to life" outside the board should wrap at the other side of the board.`
   ##### `- Once the next generation is done, User can trigger "next generation" again.`
   
Of particular note is the  idea that a cell "comes to life" `Look out for cells appearing on the opposite side of the board from 3 or more cells that become 
active on the board's edge

A simulation can either end with

   #### `the cell generation no longer changing the grid at all`
         All active cells remain active and no "dead/empty" cells come to life from one generation to the next
   #### `An Empty Grid`
         All cells are inactive 
   #### `The Grid running indefinitely`
         Patterns develop on the grid which go into a repeat cycle which will never see either of the scenarios above occur
         
At any time, a simulation can be STOPPED via the stop button. At this point the cell generation stops and the user can interact with the 
grid again and START, REPEAT or CLEAR as they choose

It is also possible to CLEAR the grid which is an option available at all times when there are active cells

It is also possible to REPEAT the previous cell which simply re-runs the previous cell simulation

## `Technical Design`

The application was developed using react with typescript. It has test cases for all the calculations around cell generation. 

I have used the `useReducer` function of react to hold the "state" of the application. There is a collection of actions which allow the components
to interact with the applications state 

    export const START = "START"
    export const STOP = "STOP"
    export const REPEAT = "REPEAT"
    export const NUMBER_OF_ROWS = "NUMBER_OF_ROWS"
    export const NUMBER_OF_COLS = "NUMBER_OF_COLS"
    export const ACTIVATE_CELL = "ACTIVATE_CELL"
    export const UPDATE_CELLS = "UPDATE_CELLS"
    
Each of these have a corresponding reducer which manipulate the state before triggering a re-render of the application. 

The cell generation is controlled within react's `useEffect` function which creates a timer set for intervals of 1 second. At each interval 
the next generation of cells is presented

The CellSimulation react components are developed using "styled-component". This allowed, for example, the dynamic setting of the grid rows and columns within which 
the cells were created.

The live/dead nature of each cell is held in a simple map of values.
export type CellValues = {
  [key: string]: boolean;
}
A key of 'row_col" identifies a cell, e.g. row 3, column 10 has a key of "3_10" and, if it is active,
the cellValues will have the following appearance:
  
  `{"3_10: true ......}`
  
There are extensive tests around the algorithm to calcuale the next generation - see `src\generator\calcNextGeneration.test.ts`. Included is a test to ensure
that the simulation at https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg is successful

## Testing

Unit testing is 100% on the cell calculations, actions and reducers. All Actions/reducers and algorithms have 100% coverage

## Future Enhancements

I would like to have added the facility to mark entire rows or columns as live(or dead) via some component. I alos think it would be interesting to allow the user to predict 
whether the simulator will run indefinitely prior to starting the generation. It would also be useful to have some standard configurations available for automatic selections 
instead of manually (de)selecting cells.

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

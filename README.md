# DigitalOrganism

DigitalOrganism is an interactive, visually captivating cellular automaton simulation that explores the fascinating world of emergent patterns and complexity. This project, inspired by Multiple Neighborhood Cellular Automata (MNCA), offers a unique playground for designers, researchers, and enthusiasts in the fields of generative art, computational design, and complex systems.

## Features

- Real-time cellular automaton simulation
- Interactive mouse-driven input
- Multiple rulesets for diverse pattern generation
- Customizable parameters for experimentation

## How It Works

DigitalOrganism uses a grid of cells that evolve based on the states of their neighbors. The simulation considers two neighborhoods for each cell:

1. A closer neighborhood (hood0)
2. A more extended neighborhood (hood1)

The evolution rules are defined by the `conditions` object, which determines the next state of each cell based on its current state and the states of its neighbors.

## Customization

The code is designed to be easily customizable, allowing you to experiment with different rulesets, visual styles, and interactions. Here are some ways you can modify the project:

1. **Rulesets**: Adjust the `conditions` object in `sketch.js` to create new cellular automaton rules.
2. **Grid Size**: Modify the `GRID_SIZE` constant to change the resolution of the simulation.
3. **Brush Behavior**: Alter the `handleMouseInput()` function to change how user input affects the cells.
4. **Color Schemes**: Update the cell rendering in `updateCells()` to experiment with different color patterns.
5. **Neighborhoods**: Modify `calculateHood0()` and `calculateHood1()` to explore different neighborhood configurations.

## Inspiration and Further Exploration

This project draws inspiration from the work of Slackermanz on Multiple Neighborhood Cellular Automata. To dive deeper into the subject, consider exploring:

- Cellular automaton theory
- Complexity science
- Generative art techniques
- Computational aesthetics

By experimenting with DigitalOrganism, you can gain insights into how simple rules can lead to complex, emergent behaviors—a fundamental concept in both design and natural systems.

## Get Started

Open `index.html` in a modern web browser to run the simulation. Click and drag on the canvas to interact with the cells and observe how patterns evolve over time.

Happy exploring! :-)

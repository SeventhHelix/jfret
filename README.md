# JFret
JFret is a simple guitar tool to help learn guitar chords, scales, and patterns. 

JFret is my first React project, with the intention of building something useful that I'd personally use.

# Features
Planned features:
* Name of currently selected chord
* Interval names relative to selected note

# Dev Notes

## Running/Building
`npm run start` - run on port `3000`, rebuilds on file changes
`npm run build` - build the project to the `build` dir

## Project Structure
Some quick notes about the project structure and contained files.
* `public/` contains meta files about the project. `index.html` just provides a mounting point for the base `App` component.
* `src/components` React components. Self-explanatory.
* `src/index.css` Generated file based on `index.scss`. Do not modify directly.


## Project Base
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Issues
* Fret dots are covered up by selected fret overlays
* Mousing over strings prevents frets from being selected

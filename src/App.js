import React from 'react';
import './App.css';
import { Graphics } from "pixi.js";
import {
  Stage,
  AppConsumer,
} from "@inlet/react-pixi";
import Game from './Game';

function App() {

  
  return (
    <Stage width={500} height={500} options={{ backgroundColor: 0x012b30 }}>
      <AppConsumer>{(app) => <Game app={app} />}</AppConsumer>
    </Stage>
  );
}

export default App;

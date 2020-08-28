import React from 'react';
import './App.css';
import {
  Stage,
  AppConsumer,
  useApp
} from "@inlet/react-pixi";
import Game from './Game';

function App() {

  const app = useApp();

  return (
    <Stage width={500} height={500} options={{ backgroundColor: 0x012b30 }}>
      <AppConsumer>{(app) => <Game app={app} />}</AppConsumer>
    </Stage>
  );
}

export default App;
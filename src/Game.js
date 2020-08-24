import React from "react";
import { Graphics } from "pixi.js";
import { PixiComponent, Stage, Container, AppConsumer, useTick } from "@inlet/react-pixi";

const Game = () => {

    useTick((delta) => { });
    
    
    const Pixel = PixiComponent("Rectangle", {
      create: (props) => new Graphics(),
      applyProps: (instance, _, props) => {
        const { x, y, width, height, fill } = props;
        instance.clear();
        instance.lineStyle(1, 0x000000, 1);
        instance.beginFill(fill);
        instance.drawRect(x, y, width, height);
        instance.endFill();
        instance.position.set(x, y);
        instance.interactive = true;
        instance.pointerdown = () => {
          instance.clear();
          instance.lineStyle(1, 0x000000, 1);
          instance.beginFill(0x000000);
          instance.drawRect(x, y, width, height);
          instance.endFill();
        };
      },
    });

    let pixels = [];

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            pixels.push(
                <Pixel
                    key={i + "-" + j}
                    x={i * 1.5}
                    y={j * 1.5}
                    width={3}
                    height={3}
                    fill={0xffffff}
                />
            )
        }
    }

    return (
      <>
        {pixels}
      </>
    );
}

export default Game
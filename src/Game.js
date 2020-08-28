import React, { useState, useEffect } from "react";
import { Graphics } from "pixi.js";
import { PixiComponent, Stage, Container, AppConsumer, useTick } from "@inlet/react-pixi";

const Game = () => {

    useTick((delta) => {

        // console.log(delta);
        

    });
    
    
    const Pixel = PixiComponent("Rectangle", {
        create: (props) => new Graphics(),
        applyProps: (instance, _, props) => {
            const { x, y, width, height, fill, coordinates, alive } = props;
            if (alive === true) {
                instance.clear();
                instance.lineStyle(1, 0x000000, 1);
                instance.beginFill(fill);
                instance.drawRect(x, y, width, height);
                instance.endFill();
            } else {
                instance.clear();
                instance.lineStyle(1, 0x000000, 1);
                instance.beginFill(0x000000);
                instance.drawRect(x, y, width, height);
                instance.endFill();
            }
            instance.position.set(x, y);
            instance.interactive = true;
            instance.pointerdown = () => {

            };
      },
    });

    // const [pixels, setPixels] = useState([]);
    const [columns, setColumns] = useState(30);
    const [rows, setRows] = useState(30);
    const [pixels, setPixels] = useState([]);

    // let pixels = [];
    // for (let i = 0; i < columns; i++) {
    //     pixels.push([])
    // }
    // for (let j = 0; j < pixels.length; j++) {
    //     pixels[j].push([]);
    // }
    

    // let pixelItem = <Pixel key={i + "-" + j} coordinates={[i, j]} x={i * 1.5} y={j * 1.5} alive={Math.random() >= 0.5} width={3} height={3} fill={0xffffff} />
    
    const initialSeed = () => {
        for (let i = 0; i < columns; i++) {
            pixels.push([]);
            for (let j = 0; j < rows; j++) {
                pixels[i].push(
                  <Pixel
                    key={i + "-" + j}
                    x={i * 1.5}
                    y={j * 1.5}
                    alive={Math.random() >= 0.5}
                    width={3}
                    height={3}
                    fill={0xffffff}
                  />
                );
            }
        }
    }

    initialSeed();

    console.log(pixels);
    console.log(pixels[4][4]);

    // console.log(pixels[0]);

    // Calculate neighbors on each one
    const calculateNeighbors = (x, y) => {
        // const neighborsArray = [[-1, 0], [1, 1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
        let neighbors = 0;
        const isAlive = (x, y) => {
            return pixels[x] && pixels[x][y] && pixels[x][y].props.alive === true;
        }
        if (isAlive(x - 1, y - 1)) neighbors++;
        if (isAlive(x, y - 1)) neighbors++;
        if (isAlive(x + 1, y - 1)) neighbors++;
        if (isAlive(x - 1, y)) neighbors++;
        if (isAlive(x + 1, y)) neighbors++;
        if (isAlive(x - 1, y + 1)) neighbors++;
        if (isAlive(x, y + 1)) neighbors++;
        if (isAlive(x + 1, y + 1)) neighbors++;
        
        return neighbors;
        // console.log(`${x}, ${y} has ${neighbors} neighbors`);
    };

    // const update = () => {
    //     let nextPixels = [];
    //     for (let i = 0; i < pixels.length; i++) {
    //         nextPixels.push([]);
    //         for (let j = 0; j < pixels[i].length; j++) {
    //             let neighbors = calculateNeighbors(i, j);
    //             // if (neighbors < 2 || neighbors > 3) {
    //             //     pixels[i].push(
    //             //         <Pixel
    //             //             key={i + "-" + j}
    //             //             coordinates={[i, j]}
    //             //             x={i * 1.5}
    //             //             y={j * 1.5}
    //             //             alive={false}
    //             //             width={3}
    //             //             height={3}
    //             //             fill={0xffffff}
    //             //         />
    //             //     );
    //             // } else if (neighbors === 3) {
    //             //     pixels[i].push(
    //             //         <Pixel
    //             //         key={i + "-" + j}
    //             //         coordinates={[i, j]}
    //             //         x={i * 1.5}
    //             //         y={j * 1.5}
    //             //         alive={true}
    //             //         width={3}
    //             //         height={3}
    //             //         fill={0xffffff}
    //             //         />
    //             //     );
    //             // }
    //         }
    //     }
    //     console.log(nextPixels);
    // }

    const update = () => {
        let updated = [];
        for (let i = 0; i < columns; i++) {
            updated.push([]);
            for (let j = 0; j < rows; j++) {
                let neighbors = calculateNeighbors(i, j);
                if (neighbors < 2 || neighbors > 3) {
                    // console.log(`DEAD: ${i}, ${j} has ${neighbors} neighbors`);
                    updated[i].push(
                      <Pixel
                        key={i + "-" + j}
                        coordinates={[i, j]}
                        x={i * 1.5}
                        y={j * 1.5}
                        alive={false}
                        width={3}
                        height={3}
                        fill={0xffffff}
                      />
                    );
                } else if (neighbors === 3) {
                    // console.log(`LIVES: ${i}, ${j} has ${neighbors} neighbors`);
                    updated[i].push(
                      <Pixel
                        key={i + "-" + j}
                        coordinates={[i, j]}
                        x={i * 1.5}
                        y={j * 1.5}
                        alive={true}
                        width={3}
                        height={3}
                        fill={0xffffff}
                      />
                    );
                }
            }
        }
        setPixels(updated);
    }

    // update();

    // console.log(pixels);



    useEffect(() => {
        setTimeout(function () {
            update();
            console.log(`Update Ran: ${Date.now()}`);
        }, 200);
    }, [pixels]);


    // const neighborCalc = (x, y) => {
    //     // All the 8 different squares around a point
    //     const neighborsArray = [[-1, 0], [1, 1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    //     let aliveNeighbors = 0;
    //     neighborsArray.forEach(
    //         // compare each x, y to neighbor
    //         // how do we define a neighbor and access it in the array?
    //     )
    // }

    // x = pos%rows+1
    // y = pos%columns + 1

    // For an upper location, you minus the width minus whatever else
    // For a lower location, you add width  + whatever
    // For sides, just +1 -1 

    // runGame();

    // let aliveNeighbors = 0;
    // for (let i = 0; i < pixels.length; i++) {
        
    //     // left
    //     // if (pixels[(i - 1)].props.alive === true) aliveNeighbors++;
    //     // console.log(pixels[i - 1].props.alive)
    //     // if (i > 0) {
    //     //     if (pixels[i - 1].props.alive === true) aliveNeighbors++;
    //     // } else if (i === (pixels.length - 1)) {
    //     //     console.log("last one")
    //     // }
    //     // if in first row
    //     // if in last row
    //     // how can 
    //     console.log(pixels[i]);
    // }

    // const calculateNeighbors = (x, y) => {
    //     let neighbors = 0
    //     const neighborsArray = [[-1, 0], [1, 1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    //     console.log(pixels[x][y])
    // }

    // calculateNeighbors(0, 2)

    // console.log(pixels);
    // console.log(pixels[3][0]);

    // design of array really should be array = [first row[[first item], [second item]], secondrow[]]


    // const neighborArrayCalc = (grid, coordinates) => {
    //     // All the 8 different squares around a point
    //     const neighborsArray = [[-1, 0], [1, 1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    //     // for every pixel
    //     for (let i = 0; i < pixels.length; i++) {
    //         // for every potential neighbor of every pixel
    //         for (let j = 0; j < neighborsArray.length; j++) {
    //             let aliveNeighbors = 0;
    //             const neighbor = neighborsArray[j];
    //             const y = coordinates[1] + neighbor[0];
    //             const x = coordinates[0] + neighbor[1];
                
    //             if (x >= 0 && x < columns && y >= 0 && y < rows && grid[y][x]) {
    //                 aliveNeighbors++;
    //             }
    //             if (aliveNeighbors === 2 || aliveNeighbors === 3) {
    //                 pixelsNext[y][x].props.alive = true;
    //             } else {
    //                 pixelsNext[y][x].props.alive = false;
    //             }
    //         }
    //     }
    // };

    return (
      <>
            {pixels}
      </>
    );
}

export default Game
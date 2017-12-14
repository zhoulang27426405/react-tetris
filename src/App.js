import React, { Component } from 'react';
import './App.css';
import Tetris from './component/Tetris/Tetris';

class App extends Component {
  render() {
    // 采用一个二维数组标示一个活动中的俄罗斯方块
    const shapesArray = [
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
      ]
    ];
    let rowCount = 18; // 界面行数
    let colCount = 10; // 界面列数
    let tetrisArray = []; // 俄罗斯方块状态集
    if (!tetrisArray.length) {
      for (let i = 0; i < rowCount; i++) {
        let tempArray = [];
        for (let j = 0; j < colCount; j++) {
          tempArray.push({active: 0,static: 0});
        }
        tetrisArray.push(tempArray);
      }
    }
    return (
      <div className="App">
        <Tetris shapesArray={shapesArray} tetrisArray={tetrisArray} />
      </div>
    )
  }
}

export default App;

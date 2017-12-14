import React, {Component} from 'react';
import './Tetris.css';

class Tetris extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tetrisArray: this.props.tetrisArray,
      shapeArray: [], // 活动中的俄罗斯方块
      px: 0, // 活动中的方块的位置信息
      py: 0 // 活动中的方块的位置信息
    }
  }
  // 生成一个随机俄罗斯方块
  randomShape() {
    let _shapeArray = [];
    _shapeArray = this.props.shapesArray[parseInt(Math.random() * this.props.shapesArray.length, 10)];
    this.setState({
      shapeArray: _shapeArray
    });
  }
  // 清空俄罗斯方块
  hideTetris() {
    let _tetrisArray = this.state.tetrisArray;
    this.state.shapeArray.map((shape, i) => {
      shape.map((item, j) => {
        if (item) {
          _tetrisArray[this.state.py + i][this.state.px + j].active = 0;
        }
      })
    })
    this.setState({
      tetrisArray: _tetrisArray
    });
  }
  // 显示俄罗斯方块
  showTetris() {
    let _tetrisArray = this.state.tetrisArray;
    this.state.shapeArray.map((shape, i) => {
      shape.map((item, j) => {
        if (item) {
          _tetrisArray[this.state.py + i][this.state.px + j].active = 1;
          this.setState({
            tetrisArray: _tetrisArray
          });
        }
      })
    })
  }
  // 删除某行
  delete(line) {
    let _tetrisArray = this.state.tetrisArray;
    for (let j = 0; j < _tetrisArray[line].length; j++) {
      _tetrisArray[line][j].static = 0;
    }
    for (let i = line; i > 0; i--) {
      for (let j = 0; j < _tetrisArray[line].length; j++) {
        _tetrisArray[i][j].static = _tetrisArray[i - 1][j].static;
      }
    }
    this.setState({
      tetrisArray: _tetrisArray
    });
  }
  // 检测是否满行
  preDelete() {
    let _tetrisArray = this.state.tetrisArray;
    for (let i = 0; i < _tetrisArray.length; i++) {
      let j = 0;
      for (j; j < _tetrisArray[i].length; j++) {
        if (!_tetrisArray[i][j].static) {
          break;
        }
      }
      if (j === _tetrisArray[i].length) {
        this.delete(i);
      }
    }
  }
  // 检测是否碰壁
  check(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          if (x + j < 0 || x + j > this.state.tetrisArray[0].length - 1 || y + i > this.state.tetrisArray.length - 1 || this.state.tetrisArray[y + i][x + j].static) {
            return false;
          }
        }
      }
    }
    return true;
  }
  // 固定方块
  fix() {
    let _tetrisArray = this.state.tetrisArray;
    this.state.shapeArray.map((shape, i) => {
      shape.map((item, j) => {
        if (item) {
          _tetrisArray[this.state.py + i][this.state.px + j].static = 1;
          _tetrisArray[this.state.py + i][this.state.px + j].active = 0;
          this.setState({
            tetrisArray: _tetrisArray
          });
        }
      })
    })
    this.preDelete();
  }
  // 移动方块
  move(h, v) {
    let _px;
    let _py;
    _px = this.state.px + h;
    _py = this.state.py + v;
    if (this.check(_px, _py, this.state.shapeArray)) {
      // 未碰壁更新组件状态
      this.hideTetris();
      this.setState({
        px: _px,
        py: _py
      });
      this.showTetris();
    } else {
      // 水平移动碰壁后直接返回，垂直下降碰壁固定方块并开始下一次操作
      if (v === 0) {
        return false;
      }
      this.fix();
      this.setState({
        px: 0,
        py: 0
      });
      this.randomShape();
      this.showTetris();
      clearInterval(this.timeId);
      this.timeId = '';
    }
  }
  // 旋转方块
  rotate() {
    let _shapeArray = [];
    for (let i = 0; i < this.state.shapeArray[0].length; i++) {
      let tempArray = [];
      for (let j = 0; j < this.state.shapeArray.length; j++) {
        tempArray.push(0);
      }
      _shapeArray.push(tempArray);
    }
    this.state.shapeArray.map((shape, i) => {
      shape.map((item, j) => {
        _shapeArray[this.state.shapeArray[0].length - 1 - j][i] = item;
      })
    })
    if (this.check(this.state.px, this.state.py, _shapeArray)) {
      this.hideTetris();
      this.setState({
        shapeArray: _shapeArray
      });
      this.showTetris();
    }
  }
  // 快速下降
  quickDown() {
    if (this.timeId) return;
    this.timeId = setInterval(() => {
      this.move(0, 1);
    }, 0);
  }
  // 绑定事件
  bindEvents() {
    document.onkeydown = (e) => {
      let code = e.code;
      switch (code) {
        case 'Space': this.quickDown(); break;
        case 'ArrowLeft': this.move(-1, 0); break;
        case 'ArrowUp': this.rotate(); break;
        case 'ArrowDown': this.move(0, 1); break;
        case 'ArrowRight': this.move(1, 0); break;
        default: break;
      }
    }
  }
  componentDidMount() {
    this.randomShape();
    this.showTetris();
    this.bindEvents();
    setInterval(() => {
      this.move(0, 1);
    }, 1000);
  }
  render() {
    return (
      <div className="tetris-warp">
        <ul>
        {
          this.state.tetrisArray.map((tetris, i) =>
            <li key={i}>
              <ul className="tetris-box">
              {
                tetris.map((item, j) =>
                  <li key={i + j} className={item.static || item.active ? 'tetris-black' : 'tetris-normal'}></li>
                )
              }
              </ul>
            </li>
          )
        }
        </ul>
      </div>
    )
  }
}
export default Tetris;

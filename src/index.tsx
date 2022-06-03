import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
// import './index.css'
import { Input, Button, Row, Col, InputNumber, Select } from 'antd'
import 'antd/dist/antd.css';
const { Option } = Select;

type State = {
  num: number
  result: boolean
  type: string
  resize: boolean
}
class App extends React.Component<{}, State> {
  state = {
    num: 0,
    result: null,
    type: "isPrime",
    resize: false
  }
  onNum = (value: number) => {
    this.setState({ num: value },() => this.onCal())
  }

  onCeil = (value: string) => {
    return Math.round(parseInt(value))
  }

  onType = (value: string) => {
    this.setState({ type: value },() => this.onCal())
  }

  isPrime = (value: number) => {
    let isPrime = true;
    if (value === 1) {
      isPrime = false
    }
    else if (value > 1) {
      for (let i = 2; i < value; i++) {
        if (value % i == 0) {
          isPrime = false;
        }
      }
    }
    return isPrime
  }

  isPerfectSquare = (value: number) => {
    let s = parseInt(Math.sqrt(value));
    return (s * s == value);
  }

  isFibanacci = (value: number) => {
    return this.isPerfectSquare(5 * value * value + 4) ||
      this.isPerfectSquare(5 * value * value - 4);
  }

  onCal = async () => {
    let status
    if (this.state.type == "isPrime") {
      status = await this.isPrime(this.state.num)
      console.log(status)
    } else {
      status = await this.isFibanacci(this.state.num)
      console.log(status)

    }
    this.setState({result: status})
  }
  
  componentDidMount(): void {
    window.addEventListener("resize", this.resize.bind(this));
    this.onCal()
  }
   resize = () => {
    let current = window.innerWidth <= 600;
    if (current) {
      this.setState({
        resize: false,
      });
    } else {
      this.setState({
        resize: true,
      });
    }
  };
  render() {
    let { num, result, type, resize } = this.state
    return (
      <Row>
        <Col style={{ width: 200 }}>
          <InputNumber value={num} onChange={this.onNum} parser={this.onCeil} />
        </Col>
        <Col style={{width: 'calc(100% - 500px)',minWidth: "1%",overflowX: "scroll" } }>
          <Select onChange={this.onType} value={type}>
            <Option value="isPrime">isPrime</Option>
            <Option value="isFibanacci">isFibanacci</Option>
          </Select>
        </Col>
        <Col style={{ width: 300 }}>{result ? "true" : "false"}</Col>
      </Row>
    )
  }
}

render(<App />, document.getElementById('root'))
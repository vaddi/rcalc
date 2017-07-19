import React from 'react';
import ReactDOM from 'react-dom';

// import components
import { Display } from './components/Display';
import { Button } from './components/Button';

const initialValue = '';
const initialOp = undefined;

class Calculator extends React.Component {
  
  constructor(props) {
    super(props);
    // Initial State
    this.state = { 
      displayValue: initialValue,
      buffer: 0,
      operator: initialOp
    };
    // Event Listener
    this.calculate = this.calculate.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.setNumber = this.setNumber.bind(this);
  }
  
  calculate() {
    // do calculation stuff
    const buffer = parseInt(this.state.buffer,10);
    const value = parseInt(this.state.displayValue,10);
    const operator = this.state.operator;
    let result = 0;
    
    // calculation
    switch(operator) {
      case '+':
        result = buffer + value;
        break;
      case '-':
        result = buffer - value;
        break;
      case '*':
        result = buffer * value;
        break;
      case '/':
        if (buffer===0 || value===0) {
          result = 'Err: div by zero';
        } else {
          result = buffer / value;
        }
        break;
      case '%':
        result = value * 0.1;
        break;
      default:
        result = 'Unknown Op';
        break;
    }
    
    this.setState({ 
      displayValue: result,
      buffer: 0,
      operator: initialOp
    });
  }

  updateDisplay(newValue) {
    //const value = this.props.value;
    this.setState({ 
      displayValue: newValue,
      buffer: this.state.buffer,
      operator: this.state.operator
    });
  }
  
  clearDisplay() {
    this.setState({ 
      displayValue: initialValue,
      buffer: initialValue,
      operator: initialOp
    });
  }
  
  setOperator(newOperator) {
    let displayValue = this.state.displayValue;
    let buffer = this.state.buffer;
    let operator = this.state.operator === newOperator ? undefined : newOperator;
    if (operator==='%') {
      displayValue *= 0.01;
      operator = initialOp;
      buffer = 0;
    } else {
      displayValue = initialValue;
      buffer = this.state.displayValue;
    }
    this.setState({
      displayValue: displayValue,
      buffer: buffer,
      operator: operator
    });
  }

  setNumber(newNumber) {
    let displayValue = this.state.displayValue === 0 ? '' : this.state.displayValue;
    if (!isNaN(parseFloat(displayValue)) && isFinite(displayValue)) {
      displayValue = 'Not a Number';
    } else {
      displayValue += newNumber;
    }
    this.setState({
      displayValue: displayValue,
      buffer: this.state.buffer,
      operator: this.state.operator
    });
  }

  render() {
    return (
      <div>
        <div>
          <Display value={this.state.displayValue} onChange={this.updateDisplay} />
        </div>
        <br />
        <div>
          <Button className="double del" title="Del" onClick={this.clearDisplay} /> <Button title="%" value="%" onClick={this.setOperator} className="op" /> <Button title="+" value="+" onClick={this.setOperator} className="op" />
        </div>
        <div>
          <Button title="7" value="7" onClick={this.setNumber} /> <Button title="8" value="8" onClick={this.setNumber} /> <Button title="9" value="9" onClick={this.setNumber} /> <Button title="-" value="-" onClick={this.setOperator} className="op" /> <br />
          <Button title="4" value="4" onClick={this.setNumber} /> <Button title="5" value="5" onClick={this.setNumber} /> <Button title="6" value="6" onClick={this.setNumber} /> <Button title="*" value="*" onClick={this.setOperator} className="op" /> <br />
          <Button title="1" value="1" onClick={this.setNumber} /> <Button title="2" value="2" onClick={this.setNumber} /> <Button title="3" value="3" onClick={this.setNumber} /> <Button title="/" value="/" onClick={this.setOperator} className="op" /> <br />
          <Button className="double" title="0" value="0" onClick={this.setNumber} /> <Button title="." value="." /> <Button title="=" onClick={this.calculate} className="calc" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('calculator')
);


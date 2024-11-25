import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs'; // Import evaluate from mathjs
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const evaluated = evaluate(input);
        // Display the evaluated result in the input
        setInput(evaluated.toString());
      } catch (e) {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else if (value === '√') {
      try {
        const sqrtValue = Math.sqrt(parseFloat(input));
        // Display the square root result in the input
        setInput(sqrtValue.toString());
      } catch (e) {
        setInput('Error');
      }
    } else {
      // Append the value to the input
      setInput(input + value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/[0-9+\-*/().]/.test(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        setInput(input.slice(0, -1));
      } else if (key === 'Escape') {
        handleButtonClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Properly manage input
          onFocus={(e) => e.target.select()} // Select input on focus
        />
      </div>
      <div className="buttons">
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button className="operator" onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button className="operator" onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button className="operator" onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button className="equal" onClick={() => handleButtonClick('=')}>=</button>
        <button className="operator" onClick={() => handleButtonClick('+')}>+</button>
        <button className="clear" onClick={() => handleButtonClick('C')}>C</button>
        <button className="operator" onClick={() => handleButtonClick('(')}>(</button>
        <button className="operator" onClick={() => handleButtonClick(')')}>)</button>
        <button className="operator" onClick={() => handleButtonClick('√')}>√</button>
      </div>
    </div>
  );
};

export default Calculator;

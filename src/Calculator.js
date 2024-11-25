import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = useCallback((value) => {
    if (value === '=') {
      try {
        const evaluated = evaluate(input);
        setInput(evaluated.toString()); // Set input to the evaluated result
      } catch (e) {
        setInput('Error'); // Display error in the input field
      }
    } else if (value === 'C') {
      setInput(''); // Clear the input field
    } else if (value === '√') {
      try {
        const sqrtValue = Math.sqrt(parseFloat(input));
        setInput(sqrtValue.toString()); // Set input to the square root value
      } catch (e) {
        setInput('Error'); // Display error in the input field
      }
    } else {
      setInput((prevInput) => prevInput + value); // Append the button value to the input
    }
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/[0-9+\-*/().]/.test(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        setInput(input.slice(0, -1)); // Remove the last character from the input
      } else if (key === 'Escape') {
        handleButtonClick('C'); // Clear the input field
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, handleButtonClick]);

  return (
    <div className="calculator">
      <div className="display">
        <input
          type="text"
          value={input}
          onChange={() => {}} // Prevent React warning about uncontrolled input
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

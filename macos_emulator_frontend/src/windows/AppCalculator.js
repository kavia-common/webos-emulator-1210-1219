import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Calculator App - a basic calculator with MacOS look and feel.
 * Supports: +, -, *, /, clear/reset.
 */
export default function AppCalculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);         // accumulated value
  const [operator, setOperator] = useState(null); // pending operator (+ - * /)
  const [waiting, setWaiting] = useState(false); // if waiting for new entry

  // Handle number or .
  function inputDigit(d) {
    if (waiting) {
      setDisplay(d === "." ? "0." : d);
      setWaiting(false);
    } else {
      if (d === "." && display.includes(".")) return;
      setDisplay(display === "0" && d !== "." ? d : display + d);
    }
  }
  // Handle operators
  function inputOp(nextOp) {
    let value = parseFloat(display);
    if (acc === null) {
      setAcc(value);
    } else if (operator) {
      const result = compute(acc, value, operator);
      setAcc(result);
      setDisplay(String(result));
    }
    setOperator(nextOp);
    setWaiting(true);
  }
  function compute(x, y, op) {
    switch (op) {
      case "+": return +(x + y).toPrecision(12) * 1;
      case "-": return +(x - y).toPrecision(12) * 1;
      case "*": return +(x * y).toPrecision(12) * 1;
      case "/": return y === 0 ? "Err" : +(x / y).toPrecision(12) * 1;
      default: return y;
    }
  }
  function equals() {
    if (operator) {
      const result = compute(acc, parseFloat(display), operator);
      setDisplay(String(result));
      setAcc(null);
      setOperator(null);
      setWaiting(true);
    }
  }
  function clearAll() {
    setDisplay("0");
    setAcc(null);
    setOperator(null);
    setWaiting(false);
  }

  // Keyboard support: numbers, operators, Enter/C, Backspace, etc.
  React.useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key;
      if (/\d/.test(key)) inputDigit(key);
      if (key === ".") inputDigit(".");
      if (key === "+" || key === "-" || key === "*" || key === "/") inputOp(key);
      if (key === "Enter" || key === "=") equals();
      if (key === "c" || key === "C") clearAll();
      if (key === "Backspace") {
        if (!waiting)
          setDisplay(display.length <= 1 ? "0" : display.slice(0, -1));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [display, acc, operator, waiting]);

  // Macish color
  const btnStyle = {
    margin: 2,
    width: 44,
    height: 38,
    fontSize: 19,
    borderRadius: 8,
    border: "1.2px solid #e8eef5",
    background: "#f2f5fa",
    color: "#156",
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    transition: "all 0.1s",
  };
  const opBtnStyle = {
    ...btnStyle,
    background: "#e0f0ff",
    color: "#007aff",
    borderColor: "#add7fa",
    fontWeight: 700,
  };
  const eqBtnStyle = {
    ...btnStyle,
    background: "#fff1c5",
    color: "#c29000",
    borderColor: "#fadf80",
    fontWeight: 700,
  };
  const smallBtn = {
    ...btnStyle,
    fontSize: 16,
    width: 28,
    height: 28,
    color: "#a33",
    background: "#f8d5cf",
    borderColor: "#edbebe",
  };

  return (
    <div style={{
      padding: 20,
      maxWidth: 260,
      fontFamily: "'San Francisco', Arial, Helvetica, sans-serif",
      background: "transparent"
    }}>
      <h2 style={{ margin: "0 0 13px 0", fontSize: 17, color: "#211" }}>Calculator</h2>
      <div style={{
        width: 202,
        margin: "2px auto 12px auto",
        background: "#fcfcfa",
        borderRadius: 7,
        boxShadow: "0 2.5px 7px #99cdfd14",
        minHeight: 42,
        fontSize: 29,
        color: "#232d2d",
        textAlign: "right",
        padding: "6px 12px 7px 10px",
        letterSpacing: "1.6px",
        border: "1.1px solid #eaeefa"
      }}>
        {display}
      </div>
      <div style={{ width: 214, margin: "0 auto" }}>
        <div>
          <button style={btnStyle} onClick={() => inputDigit("7")}>7</button>
          <button style={btnStyle} onClick={() => inputDigit("8")}>8</button>
          <button style={btnStyle} onClick={() => inputDigit("9")}>9</button>
          <button style={opBtnStyle} onClick={() => inputOp("/")}>÷</button>
        </div>
        <div>
          <button style={btnStyle} onClick={() => inputDigit("4")}>4</button>
          <button style={btnStyle} onClick={() => inputDigit("5")}>5</button>
          <button style={btnStyle} onClick={() => inputDigit("6")}>6</button>
          <button style={opBtnStyle} onClick={() => inputOp("*")}>×</button>
        </div>
        <div>
          <button style={btnStyle} onClick={() => inputDigit("1")}>1</button>
          <button style={btnStyle} onClick={() => inputDigit("2")}>2</button>
          <button style={btnStyle} onClick={() => inputDigit("3")}>3</button>
          <button style={opBtnStyle} onClick={() => inputOp("-")}>–</button>
        </div>
        <div>
          <button style={btnStyle} onClick={() => inputDigit("0")}>0</button>
          <button style={btnStyle} onClick={() => inputDigit(".")}>.</button>
          <button style={eqBtnStyle} onClick={equals}>=</button>
          <button style={opBtnStyle} onClick={() => inputOp("+")}>+</button>
        </div>
        <div>
          <button style={smallBtn} onClick={clearAll} title="Clear (C)">C</button>
        </div>
      </div>
      <div style={{textAlign: "right", fontSize: 12, color: "#7a8899", marginRight: 4, marginTop: 10}}>
        <span style={{fontWeight: 500}}>Tip:</span> Use keyboard: numbers, + – * /, Enter, <span style={{fontWeight: 700, color: "#b65"}}>C</span>
      </div>
    </div>
  );
}

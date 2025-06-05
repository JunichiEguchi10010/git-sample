import { useState } from 'react'
import './App.css'

function doubleNumber(num) {
  return num * 2
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState(null)

  const handleClick = () => {
    const num = parseFloat(inputValue)
    if (!isNaN(num)) {
      const doubled = doubleNumber(num)
      setResult(doubled)
    } else {
      setResult('数値を入力してください')
    }
  }

  return (
    <div className="container">
      <h1>数値を2倍にするアプリ</h1>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="数値を入力"
      />
      <button onClick={handleClick}>2倍にする</button>
      <p className="result">結果: {result !== null ? result : '未入力'}</p>
    </div>
  )
}

export default App
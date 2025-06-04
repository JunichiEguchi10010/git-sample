import { useState } from 'react'

function App() {
  const [currentTime, setCurrentTime] = useState('')

  const getCurrentTime = () => {
    const now = new Date()
    const time = now.toLocaleTimeString()
    setCurrentTime(time)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>現在の時刻を表示</h1>
      <button onClick={getCurrentTime}>今の時刻</button>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>{currentTime}</p>
    </div>
  )
}

export default App

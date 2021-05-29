import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      <HookSwitcher/>
    </div>
  )
}

const HookSwitcher = () => {
  const [color, setColor] = useState("grey")
  const [fontSize, setFontSize] = useState(14)

  return (
    <div  style={{padding: "10px",
                  backgroundColor: color,
                  fontSize: `${fontSize}px`}}>

      <button onClick={() => setColor('blue')}>
        Blue
      </button>

      <button onClick={() => setColor('green')}>
        Green
      </button>

      <button onClick={() => setFontSize((s) => s+2)}>
        +
      </button>

      <button onClick={() => setFontSize((s) => s-2)}>
        -
      </button>

      <p>Some text</p>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)

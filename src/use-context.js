import React, {useContext} from 'react'
import ReactDOM from 'react-dom'

const MyContext = React.createContext()

const App = () => {
  return (
    <MyContext.Provider value="Hello World!!">
      <Child/>
      <HookChild/>
    </MyContext.Provider>
  )
}

const Child = () => {
  return (
    <MyContext.Consumer>
      {value => <p>{value}</p>}
    </MyContext.Consumer>
  )
}

const HookChild = () => {
  const value = useContext(MyContext)

  return <p>{value}</p>
}


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)

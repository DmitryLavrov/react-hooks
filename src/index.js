import React, {Component, useCallback, useEffect, useMemo, useState} from "react"
import ReactDOM from "react-dom"

const App = () => {
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(true)

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <ClassComponent value={value}/>
        <HookComponent value={value}/>
        <Notification/>
        <PlanetInfo id={value}/>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => setVisible(true)}>Show</button>
      </div>
    )
  }
}

class ClassComponent extends Component {
  componentDidCatch(error, errorInfo) {
    console.log('ClassComponent: componentDidCatch')
  }

  componentDidMount() {
    console.log('ClassComponent: componentDidMount')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('ClassComponent: componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('ClassComponent: componentWillUnmount')
  }

  render() {
    return <h3>{this.props.value}</h3>
  }
}

const HookComponent = ({value}) => {

  // Mount and Unmount
  useEffect(() => {
    console.log('mount')
    return console.log('unmount')
  }, [])

  // Analog componentDidUpdate() (with DidMount)
  useEffect(() => console.log('update'),)

  return <h3>{value}</h3>
}

const Notification = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(setVisible, 3000, false)
    return () => clearTimeout(timer)
  }, [])

  return <div>{visible && <p>Hello!</p>}</div>
}


const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}/`)
    .then(res => res.json())
    .then(data => data)
}

const useRequest = (request) => {
  const initialState = useMemo(() => ({
      data: null,
      loading: true,
      error: null
    }), []
  )

  const [dataState, setDataState] = useState(initialState)

  useEffect(() => {
    setDataState(initialState)
    let canceled = false
    request()
      .then(data => {
        !canceled && setDataState({
          data,
          loading: false,
          error: null
        })
      })
      .catch(error => {
        !canceled && setDataState({
          data: null,
          loading: false,
          error
        })
      })
    return () => {
      canceled = true
    }
  }, [request, initialState])

  return dataState
}

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id])

  return useRequest(request)
}

const PlanetInfo = ({id}) => {
  const {data, loading, error} = usePlanetInfo(id)

  if (error) return <div>Something is wrong...</div>

  if (loading) return <div>loading...</div>

  return <div><p>{id} - {data && data.name}</p></div>
}


ReactDOM.render(<App/>, document.getElementById('root'))
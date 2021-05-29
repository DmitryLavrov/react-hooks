# React Hooks
### Check [create-react-app](https://github.com/facebook/create-react-app) version (4.0.3)
```
create-react-app --version
```

### To update [create-react-app](https://github.com/facebook/create-react-app)
```
npm update -g create-react-app
```

### To install [create-react-app](https://github.com/facebook/create-react-app) global
```
npm update -g create-react-app
```

### To create new project 
```
npm install create-react-app react-hooks
```

### To create new project without installing [create-react-app](https://github.com/facebook/create-react-app)
```
npx create-react-app react-hooks
```

## Hook examples
### useState()
```
const [color, setColor] = useState("grey")
const [fontSize, setFontSize] = useState(14)
  
<button onClick={() => setColor('blue')}>Blue</button>
<button onClick={() => setFontSize((s) => s+2)}>+</button>
```
### useContext()
```
const HookChild = () => {
  const value = useContext(MyContext)
  return <p>{value}</p>
}
```

### useEffect()
```
useEffect(()=>{
    console.log('HookComponent: useEffect()')
    return () => console.log('HookComponent: Clear')
  }, [value])
  
  // Analog componentDidMount()
  useEffect(() => console.log('mount'), [])

  // Analog componentDidUpdate() (with DidMount)
  useEffect(() => console.log('update'), )

  // Analog componentDidUnmount()
  useEffect(() => () => console.log('unmount'), [])

  // Mount and Unmount
  useEffect(() => {
    console.log('mount')
    return console.log('unmount')
  }, [])
```

### Notification disappear in 3 seconds
``` 
const Notification = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(setVisible, 3000, false)
    return () => clearTimeout(timer)
  }, [])

  return <div>{visible && <p>Hello!</p>}</div>
}
```

### Loading data. "Race condition" problem for Promise
```  
useEffect(() => {
    let canceled = false
    fetch(`https://swapi.dev/api/planets/${id}/`)
      .then(res => res.json())
      .then(data => {
        console.log('canceled: ', canceled)
        !canceled && setPlanetName(data.name)
      })
    return () => {canceled = true}
  }, [id])
```

### useCallback() caches the function - pattern Memo
```
const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id])

  return useRequest(request)
}
```

### useMemo() caches the result of the function
```
  const initialState = useMemo(() => ({
      data: null,
      loading: true,
      error: null
    }), []
  )
```
[You may rely on useMemo as a performance optimization, not as a semantic guarantee.](https://reactjs.org/docs/hooks-reference.html#usememo)
## Rules of Hooks
1. Only Call Hooks at the Top Level
    * Don’t call Hooks inside loops, conditions, or nested functions.
2. Only Call Hooks from React Functions
    * Call Hooks from React function components.
    * Call Hooks from custom Hooks
import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter+1),
    2000
  )

  console.log('rendering...', counter)

  return (
    <div>{counter}</div>
  )
}

export default App

import React, { useState } from 'react'

const Heading = ({ text }) =>
{
  let headingStyle = { fontSize: '1.5em', fontWeight: 'bold' };
  return <p style={headingStyle}>{text}</p>
}

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (option) =>
  {
    if (option === 'good')
    {
      setGood(good + 1);
    }
    else if (option === 'neutral')
    {
      setNeutral(neutral + 1);
    }
    else if (option === 'bad')
    {
      setBad(bad + 1);
    }
  }

  return (
    <div>
      <Heading text="give feedback" />
      <button onClick={() => handleClick('good')}>good</button>
      <button onClick={() => handleClick('neutral')}>neutral</button>
      <button onClick={() => handleClick('bad')}>bad</button>
      <Heading text="statistics" />
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App

import React, { useState } from 'react'

const Heading = ({ text }) =>
{
  let headingStyle = { fontSize: '1.5em', fontWeight: 'bold' };
  return <p style={headingStyle}>{text}</p>
}

const Statistics = (props) =>
{
  console.log(props); // so they are already those updated values
  let { good, neutral, bad } = props;
  let all=good+neutral+bad;
  let average= (good - bad) / (good+neutral+bad);
  let positive=100 * good / (good+neutral+bad);
  
  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  )
}

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (option) =>
  {
    let g = good, n = neutral, b = bad;
    if (option === 'good')
    {
      g += 1;
      setGood(g);
    }
    else if (option === 'neutral')
    {
      n += 1;
      setNeutral(n);
    }
    else if (option === 'bad')
    {
      b += 1;
      setBad(b);
    }
    // setAverage((g - b) / (all + 1));
    // setPositive(100 * g / (all + 1));
    // setAll(all + 1);
  }

  return (
    <div>
      <Heading text="give feedback" />
      <button onClick={() => handleClick('good')}>good</button>
      <button onClick={() => handleClick('neutral')}>neutral</button>
      <button onClick={() => handleClick('bad')}>bad</button>
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

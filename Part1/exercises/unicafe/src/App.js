import React, { useState } from 'react'

const Heading = ({ text }) =>
{
  let headingStyle = { fontSize: '1.5em', fontWeight: 'bold' };
  return <p style={headingStyle}>{text}</p>
}

const Button = (props) =>
{
  return <button onClick={props.handler}>{props.text}</button>
}

const Statistic=(props) =>
{
  return <div>{props.text} {props.value}</div>
}

const Statistics = (props) =>
{
  console.log(props); // so they are already those updated values
  let { good, neutral, bad } = props;
  
  if (good === 0 && neutral === 0 && bad === 0)
  {
    return <div>no feedback given</div>
  }
  else
  {
    let all = good + neutral + bad;
    let average = (good - bad) / (good + neutral + bad);
    let positive = 100 * good / (good + neutral + bad);
    positive = `${positive} %`
    
    return (
      <div>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={all}/>
        <Statistic text='average' value={average}/>
        <Statistic text='positive' value={positive}/>
      </div>
    )
  }
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
    else {
      debugger;
    }
    // setAverage((g - b) / (all + 1));
    // setPositive(100 * g / (all + 1));
    // setAll(all + 1);
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handler={()=>handleClick('good')} text='good'/>
      <Button handler={()=>handleClick('neutral')} text='neutral'/>
      <Button handler={()=>handleClick('bad')} text='bad'/>
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

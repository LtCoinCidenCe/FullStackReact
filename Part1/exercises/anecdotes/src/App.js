import React, { useState } from 'react'

const App = () =>
{
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const points = new Array(anecdotes.length);
  points.fill(0);
  const [vote, setVote] = useState(points); // vote array

  let currentVote = vote[selected]; // when re-rendering, get value
  
  const [most,setMost]=useState(0); // index of most vote
  let mostVote=vote[most]; // get value
  
  console.log(selected, vote, currentVote);

  const getRandomInt = function (max)
  {
    return Math.floor(Math.random() * max);
  };;

  const onVoteClick = () =>
  {
    let copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
    if(copy[selected]>mostVote)
    {
      setMost(selected);
    }
  }

  const onNextClick = () =>
  {
    let num = getRandomInt(anecdotes.length);
    setSelected(num);
  };;

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {currentVote} votes</div>
      <button onClick={onVoteClick}>vote</button>
      <button onClick={onNextClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[most]}</div>
      <div>has {mostVote} votes</div>
    </div>
  )
}

export default App

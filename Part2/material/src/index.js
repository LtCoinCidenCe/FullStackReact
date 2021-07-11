import ReactDOM from 'react-dom'
import App from './App.js'
// import './index.css'
// import axios from 'axios'

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)
// promise.then(response => {
//   console.log(response)
// })

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(notes)
//   })

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.render(
//     <App notes={notes} />,
//     document.getElementById('root')
//   )
// })

ReactDOM.render(<App />, document.getElementById('root'))

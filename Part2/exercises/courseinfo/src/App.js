import './App.css';

const Part = (props) =>
{
  const { name, exercises } = props; // an object with name and exercises
  return <p>{name} {exercises}</p>
}

const Content = (props) =>
{
  console.log(props);
  const { parts } = props; // this should be an array
  return <div>
    {parts.map(part =>
      <Part key={part.id}
        name={part.name}
        exercises={part.exercises} />)}
  </div>
}

const Header = (props) =>
{
  const { courseName } = props; // just render the only header clearly
  return <h1>{courseName}</h1> // assume that there is only one course at the moment
}

const Course = (props) =>
{
  const { course } = props;
  const { name, parts } = course; // {string array}
  return <div>
    <Header courseName={name} />
    <Content parts={parts} />
  </div>
}

const App = () =>
{
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return <Course course={course} />
}

export default App;

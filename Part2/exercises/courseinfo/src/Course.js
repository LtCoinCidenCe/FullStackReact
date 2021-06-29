const Part = (props) =>
{
  const { name, exercises } = props; // an object with name and exercises
  return <p>{name} {exercises}</p>
}

const Content = (props) =>
{
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
  return <h2>{courseName}</h2>
}

const Course = (props) =>
{
  const { course } = props;
  const { name, parts } = course; // {string array}
  const reducer = (accumulator, currentValue) =>
  {
    // accumulator is the number, initialized by reduce's 2nd param
    // currentValue is the coming object
    console.log('accumulator:', accumulator, currentValue);
    return accumulator + currentValue.exercises;
  };
  const sum = parts.reduce(reducer, 0);
  return <div>
    <Header courseName={name} />
    <Content parts={parts} />
    <p style={{ fontWeight: 'bold' }}>total of {sum} exercises</p>
  </div>
}

export default Course;

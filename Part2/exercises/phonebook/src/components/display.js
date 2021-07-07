const Display = ({peopleList}) =>
{
  return <div>{peopleList.map(
    psn => <div key={psn.name}>{psn.name} {psn.number}</div>)}
  </div>
};

export default Display;

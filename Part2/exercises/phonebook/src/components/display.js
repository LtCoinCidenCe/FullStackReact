const Display = (props) =>
{
  const { peopleList, removePerson } = props;
  return <div>{peopleList.map(
    psn => <div key={psn.name}>
      <span style={{ marginRight: "1em" }}>{psn.name}</span><span style={{ marginRight: "1em" }}>{psn.number}</span>
      <button onClick={() => { removePerson(psn.id) }}>delete</button>
    </div>)}
  </div>
};

export default Display;

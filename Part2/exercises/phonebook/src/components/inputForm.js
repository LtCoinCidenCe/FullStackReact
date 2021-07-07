const InputForm = (props) =>
{
  const { formSubmit, newName, nameChange, newNumber, numberChange } = props;
  return <form onSubmit={formSubmit}>
    <div>name: <input value={newName} onChange={nameChange} /></div>
    <div>number: <input value={newNumber} onChange={numberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
};

export default InputForm;

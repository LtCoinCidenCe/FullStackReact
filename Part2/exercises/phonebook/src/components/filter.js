const Filter = ({ filterWord, filterWordChange }) =>
{
  return <div><span>filter shown with </span><input value={filterWord} onChange={filterWordChange} /></div>
};

export default Filter;

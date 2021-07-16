const Query = (props) =>
{
  const { query, handler } = props;
  return <div>
    <span>find countries </span><input value={query} onChange={handler} />
  </div>
}

export default Query;

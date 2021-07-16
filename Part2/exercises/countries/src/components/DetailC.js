const DetailC = ({ kanchri }) =>
{
  return <div>
    <h2>{kanchri.name}</h2>
    <div>capital {kanchri.capital}</div>
    <div>population {kanchri.population}</div>
    <h3>languages</h3>
    <ul>{kanchri.languages.map(
      lang => <li key={lang.name}>{lang.name}</li>
    )}</ul>
    <img src={kanchri.flag} alt="country's flag" height={125} />
  </div>
}

export default DetailC;

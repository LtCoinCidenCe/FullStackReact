import DetailC from "./DetailC";
import EntityC from "./EntityC";
import WeatherSummary from "./WeatherSummary";

const Result = (props) =>
{
  const { query, countryList } = props;
  if (query.length === 0)
  {
    return <div>type in the search box to find countries</div>
  }
  else
  {
    // case insensitive
    const matches = countryList.filter(
      ct => ct.name.toLowerCase().includes(query.toLowerCase())
    );
    if (matches.length > 10)
    {
      return <div>Too many matches, specify another filter</div>
    }
    else if (matches.length > 1)
    {
      // display all entities with qualified
      return <div>{matches.map(
        ct => <EntityC key={ct.name} kanchri={ct} />
      )}
      </div>
    }
    else if (matches.length === 1)
    {
      // display anything related to that one country
      // add weather
      return <div><DetailC kanchri={matches[0]} />
        <WeatherSummary capital={matches[0].capital} />
      </div>
    }
    else if (matches.length === 0)
    {
      return <div>No match for that input</div>
    }
    else
    {
      // should not happen at anytime
      return <div>error</div>
    }
  }
}

export default Result;

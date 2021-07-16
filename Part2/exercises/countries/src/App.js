import React, { useState, useEffect } from "react";
import axios from "axios";
import Query from "./components/Query";
import Result from "./components/Result";

function App()
{
  const [query, setQuery] = useState('');
  const [countryList, setCountryList] = useState([]);

  const hook = () =>
  {
    const eventHandler = (response) =>
    {
      setCountryList(response.data);
    }
    const promise = axios.get('https://restcountries.eu/rest/v2/all');
    promise.then(eventHandler);
  }
  useEffect(hook, []);
  const queryChange = (event) =>
  {
    setQuery(event.target.value);
  }
  
  return <div>
    <Query query={query} handler={queryChange} />
    <Result query={query} countryList={countryList} />
  </div>
}

export default App;

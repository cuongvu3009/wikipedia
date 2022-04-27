import React, { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (search === '') return;
      const endPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      console.log(data);
      setResults(data.query.search);
      setSearchInfo(data.query.searchinfo);
      setSearch('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1 className='title'>Wikipedia</h1>
        <form className='search-box' onSubmit={handleSubmit}>
          <input
            type='text'
            className='search-input'
            placeholder='Search something cool here...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='search-btn' type='submit'>
            Search
          </button>
        </form>
        {searchInfo.totalhits ? (
          <p>Search results: {searchInfo.totalhits}</p>
        ) : (
          ''
        )}
        <div className='info'>
          <div className='info-details'>
            {results.map((result, index) => {
              const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
              return (
                <div className='search-result' key={index}>
                  <h3>{result.title}</h3>
                  <p>{result.snippet}</p>
                  <button>
                    <a href={url}>Read more</a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

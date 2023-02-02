import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';


const getRepos = async (username) => {
  console.log('called with', username)
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  return res.json();
};

const App = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  async function handler(username) {
    const res = await getRepos(username);
    if (Array.isArray(res)) setData(res);
  }

  const debouncedRef = useRef(debounce(handler, 1000))

  useEffect(() => {
    debouncedRef.current(username);
  }, [username]);

  return (
    <>
      <input
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
          // console.log("called with", event.target.value);
        }}
        placeholder="Enter github username"
        type="text"
      />
      <h2>Getting repos for {username}</h2>
      <ol>
        {data.map((el) => {
          return <li key={el.name}>{el.name}</li>;
        })}
      </ol>
    </>
  );
};

export default App;

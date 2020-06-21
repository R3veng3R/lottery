import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Api from "./utils/Api";

export const App: React.FC = () => {

  useEffect( () => {
    const getData = async () => {
     // const data = await Api.get("/api/ticket");
      const data = await Api.get("/actuator/health");
      console.log("fetch data: ", data);
    }

    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

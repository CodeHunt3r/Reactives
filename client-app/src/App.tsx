import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
    const [activites, setActivites] = useState([]);

    //Callback with Arrow Function
    useEffect( () => {
      axios.get('http://localhost:5000/api/activities')
        .then(response => {
          console.log(response);
          setActivites(response.data)
        })
    }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {activites.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

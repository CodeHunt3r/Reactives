import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import './App.css';
function App() {
    const [activites, setActivites] = useState([]);

    //Callback with Arrow Function
    useEffect( () => {
      axios.get('http://localhost:5000/api/activities')
        .then(response => {
          setActivites(response.data)
        })
    }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activites.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

function App() {
    const [activites, setActivites] = useState<Activity[]>([]);

    //Callback with Arrow Function
    useEffect( () => {
      axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(response => {
          setActivites(response.data)
        })
    }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activites.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;

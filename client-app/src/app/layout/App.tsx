import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import NavBar from './Navbar';

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
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activites={activites}/>
      </Container>
    </>
  );
}

export default App;

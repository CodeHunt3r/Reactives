import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import NavBar from './Navbar';
import { v4 as uuid } from 'uuid';


function App() {
  const [activites, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  //Callback with Arrow Function
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivites(response.data)
      })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activites.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivites([...activites.filter(x => x.id !== activity.id), activity])
      : setActivites([...activites, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity);

  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activites={activites}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;

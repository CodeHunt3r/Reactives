import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";

interface Props {
    activites: Activity[];
}

export default function ActivityDashboard({activites}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList activites={activites}/>
            </Grid.Column>
        </Grid>
    )
}
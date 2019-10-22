import React from 'react'
import { Fab, Card, CardActions, CardHeader, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ViewIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'

const Home = () => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title="First Board"
          subheader="Last Activity X time ago"
        />
        <CardActions>
          <Button variant="contained" color="primary">
            <ViewIcon /> View
          </Button>
          <Button variant="contained" color="secondary">
            <DeleteIcon /> Remove
          </Button>
        </CardActions>
      </Card>
      <Fab color="primary"><AddIcon /></Fab>
    </React.Fragment>
  )
}

export default Home

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

import ClasInfoTable from './ClassInfoTable';
import EditClassModalContainer from '../../containers/EditClassModalContainer';

const useStyles = makeStyles(theme => ({
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const ClassInfo = ({ classObj }) => {
  const classes = useStyles();

  const [open, setModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  return (
    <Card>
      <CardContent>
        <Grid container direction='row' justify='space-between'>
          <Grid item>
            <Typography gutterBottom variant='h5' component='h2'>
              Course Info
            </Typography>
          </Grid>
          <Grid item>
            <EditClassModalContainer
              open={open}
              handleClickOpen={handleClickOpen}
              docId={classObj.docId}
            />
            <Button
              variant='outlined'
              className={classes.indigoButton}
              startIcon={<EditIcon />}
              onClick={() => handleClickOpen(true)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <ClasInfoTable {...classObj} />
    </Card>
  );
};

export default ClassInfo;

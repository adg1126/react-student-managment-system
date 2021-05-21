import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ClassForm from './ClassForm';
import Notification from '../notification/Notification';

const EditClass = ({ classObj, editClass, status }) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const onSubmit = formValues => {
    editClass(classObj.courseCode, formValues);
  };

  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    setNotificationOpen(true);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  }, [status]);

  const handleNotificationClose = e => {
    setNotificationOpen(false);
  };

  return classObj ? (
    <Grid
      container
      direction='column'
      style={{ width: matchesXS ? '100%' : '50%' }}
    >
      <Grid item>
        <Typography variant='h3'>Edit Class</Typography>
      </Grid>
      <Grid item>
        <ClassForm
          initialValues={_.pick(classObj, 'courseCode', 'courseName', 'units')}
          onSubmit={onSubmit}
        />
      </Grid>
      {status.success || status.err ? (
        <Notification
          status={status}
          notificationOpen={notificationOpen}
          handleNotificationClose={handleNotificationClose}
        />
      ) : null}
    </Grid>
  ) : null;
};

export default EditClass;

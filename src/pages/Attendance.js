import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {
  EditingState,
  IntegratedEditing,
  ViewState
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';

import EditIcon from '@material-ui/icons/Edit';

import ReusableCard from '../components/ReusableCard';
import TakeAttendanceContainer from '../containers/attendance/TakeAttendanceContainer';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  col: {
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

const Attendance = ({ setCurrentDate, courseDates, status }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const AppointmentTooltipHeader = ({ appointmentData }) => {
    return (
      <Grid container justify='flex-end'>
        <Grid item>
          <IconButton onClick={() => setCurrentDate(appointmentData)}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const schedulerCard = {
    header: '',
    content: (
      <Paper>
        <Scheduler data={courseDates}>
          <ViewState defaultCurrentDate={new Date()} />
          <EditingState />
          <IntegratedEditing />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            headerComponent={AppointmentTooltipHeader}
          />
        </Scheduler>
      </Paper>
    ),
    actions: ''
  };

  const takeAttendanceCard = {
    header: '',
    content: <TakeAttendanceContainer />,
    actions: ''
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <Grid
        className={classes.col}
        container
        direction={matchesSM ? 'column-reverse' : 'row'}
        alignItems={matchesSM ? 'center' : 'flex-start'}
        spacing={4}
      >
        <Grid item style={{ width: matchesSM ? '100%' : '60%' }}>
          <ReusableCard {...schedulerCard} />
        </Grid>
        <Grid style={{ width: matchesSM ? '95%' : '40%' }}>
          <ReusableCard {...takeAttendanceCard} />
        </Grid>
        <NotificationContainer status={status} />
      </Grid>
    </Grid>
  );
};

export default Attendance;

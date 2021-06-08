import React from 'react';
import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '1em'
  }
}));

const Schedule = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const getDates = () => {
    let classDates = [];
    var day = moment().startOf('month').day('Sunday');

    if (day.date() > 7) day.add(7, 'd');

    var month = day.month();

    while (month === day.month()) {
      // console.log(day.format('YYYY-MM-DD'));
      classDates.push({
        startDate: moment(`${day.format('YYYY-MM-DD')} 11:30`).toDate()
      });
      day.add(7, 'd');
    }

    console.log(classDates);
  };

  getDates();

  return (
    <Grid
      className={classes.mainContainer}
      container
      direction={matchesMD ? 'column' : 'row'}
    >
      <Grid item>
        <Paper>
          <Scheduler
            // data={appointments}
            height={660}
          >
            <WeekView startDayHour={7} endDayHour={19} />
            <Appointments />
          </Scheduler>
        </Paper>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default Schedule;

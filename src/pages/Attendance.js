import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {
  EditingState,
  IntegratedEditing
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import TakeAttendanceContainer from '../containers/attendance/TakeAttendanceContainer';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '1em',
    width: '100%'
  },
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue'
      }
    },
    '& label.Mui-focused': {
      color: 'blue'
    }
  },
  greyButton: {
    ...theme.button
  }
}));

const Attendance = ({
  fetchAttendanceStart,
  setCurrentCourse,
  setCurrentDate,
  currentCourse,
  CourseDates,
  status
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [data, setData] = React.useState(CourseDates);
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(false);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true
  });

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging
  } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map(appointment =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter(appointment => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  const onAddedAppointmentChange = React.useCallback(appointment => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <MonthView.TimeTableCell
        {...restProps}
        onDoubleClick={undefined}
        // onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );

  const AppointmentTooltipHeader = ({ appointmentData }) => {
    return (
      <Grid container justify='flex-end'>
        <Grid item>
          <IconButton onClick={() => setCurrentDate(appointmentData)}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setCurrentDate(appointmentData)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );

  return (
    <Grid
      className={classes.mainContainer}
      container
      direction={matchesSM ? 'column' : 'row'}
      alignItems='flex-start'
      spacing={3}
    >
      <Grid item style={{ width: matchesSM ? '90%' : '60%' }}>
        <Paper>
          <Scheduler data={CourseDates}>
            <EditingState
              onCommitChanges={onCommitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={onAddedAppointmentChange}
            />

            <IntegratedEditing />
            <MonthView
              startDayHour={9}
              endDayHour={19}
              timeTableCellComponent={TimeTableCell}
            />

            <Appointments />

            <AppointmentTooltip
              showOpenButton
              showDeleteButton={allowDeleting}
              headerComponent={AppointmentTooltipHeader}
            />
            <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
          </Scheduler>
        </Paper>
      </Grid>
      <Grid style={{ width: matchesSM ? '90%' : '40%' }}>
        <TakeAttendanceContainer />
      </Grid>
      <NotificationContainer status={status} />
    </Grid>
  );
};

export default Attendance;

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import EditIcon from '@material-ui/icons/Edit';

import EditCourseModalContainer from '../../containers/courses/EditCourseModalContainer';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  linkButton: {
    color: theme.palette.secondary.main,
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    zIndex: 1,
    '&:hover': {
      color: theme.palette.secondary.light,
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  square: {
    fontSize: '1.1em'
  },
  selectedQuare: {
    fontSize: '1.1em',
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  }
}));

const MeetingDays = ({ meetingDays }) => {
  const classes = useStyles();

  const daysArr = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  return daysArr.map((day, i) => {
    const dayAbbr = day.slice(0, 3);

    return (
      <Grid item key={day}>
        {meetingDays.includes(day) ? (
          <Avatar variant='square' className={classes.selectedQuare}>
            {dayAbbr.charAt(0).toUpperCase() + dayAbbr.slice(1)}
          </Avatar>
        ) : (
          <Avatar variant='square' className={classes.square}>
            {dayAbbr.charAt(0).toUpperCase() + dayAbbr.slice(1)}
          </Avatar>
        )}
      </Grid>
    );
  });
};

const CourseInfoTable = ({
  course: { courseCode, courseName, meetingDays },
  studentList
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align='left'>Course Code</StyledTableCell>
            <StyledTableCell align='left'>{courseCode}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Course Name</StyledTableCell>
            <StyledTableCell align='left'>{courseName}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Meeting Days</StyledTableCell>
            <StyledTableCell align='left'>
              <Grid container spacing={1}>
                <MeetingDays meetingDays={meetingDays} />
              </Grid>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Total Students</StyledTableCell>
            <StyledTableCell align='left'>{studentList.length}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CourseInfo = ({ course, studentList }) => {
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
            <EditCourseModalContainer
              open={open}
              handleClickOpen={handleClickOpen}
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
      <CourseInfoTable course={course} studentList={studentList} />
    </Card>
  );
};

export default CourseInfo;

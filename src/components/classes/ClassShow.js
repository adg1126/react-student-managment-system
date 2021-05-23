import React, { useState } from 'react';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import StudentList from '../students/StudentList';
import AddStudentModalContainer from '../../containers/AddStudentModalContainer';

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
  mainContainer: {
    margin: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
  },
  addClassButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const ClassShow = ({ classObj }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  return classObj ? (
    <Grid container direction='column' className={classes.mainContainer}>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h5'>{`${classObj.courseCode}-${classObj.courseName}`}</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <AddStudentModalContainer
            courseCode={classObj.courseCode}
            open={open}
            handleClickOpen={handleClickOpen}
          />
          <Button
            variant='outlined'
            className={classes.addClassButton}
            startIcon={<PersonAddIcon />}
            onClick={() => handleClickOpen(true)}
          >
            Add Class
          </Button>
        </Grid>
        <Grid item style={{ width: '70%' }}>
          <StudentList students={classObj.students} />
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default ClassShow;

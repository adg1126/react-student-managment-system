import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

import DeleteCourseModalContainer from '../../containers/courses/DeleteCourseModalContainer';

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
  }
}));

const Row = ({ course, students, deleteCourse }) => {
  const classes = useStyles();

  const [openDeleteCourseModal, setDeleteCourseModalOpen] = useState(false);

  const handleClickDeleteCourseModalOpen = state => {
    setDeleteCourseModalOpen(state);
  };

  const { docId, courseCode, courseName } = course;

  return (
    <StyledTableRow>
      <StyledTableCell align='left'>
        <Button
          className={classes.linkButton}
          component={Link}
          to={`/courses/${docId}`}
        >
          {courseCode}
        </Button>
      </StyledTableCell>
      <StyledTableCell align='left'>{courseName}</StyledTableCell>
      <StyledTableCell align='center'>{students.length || 0}</StyledTableCell>
      <StyledTableCell align='center'>
        <DeleteCourseModalContainer
          open={openDeleteCourseModal}
          handleClickOpen={handleClickDeleteCourseModalOpen}
          course={course}
        />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={() => handleClickDeleteCourseModalOpen(true)}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          component={Link}
          to={`/courses/${docId}`}
        >
          Edit
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const CourseListTable = ({
  courseList,
  deleteCourse,
  studentList,
  errMessage
}) => {
  const classes = useStyles();

  return courseList.length && studentList ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Course Code</StyledTableCell>
            <StyledTableCell align='left'>Course Name</StyledTableCell>
            <StyledTableCell align='center'>Total Students</StyledTableCell>
            <StyledTableCell align='center'>Tools</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList.map(course => (
            <Row
              key={course.courseCode}
              course={course}
              students={studentList.filter(student =>
                student.courses
                  ? student.courses.some(c => c.includes(course.docId))
                  : []
              )}
              deleteCourse={deleteCourse}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : errMessage ? (
    <Typography variant='h4' style={{ color: 'red' }}>
      {errMessage}
    </Typography>
  ) : (
    <Typography>You currently have no courses, add some now.</Typography>
  );
};

export default CourseListTable;

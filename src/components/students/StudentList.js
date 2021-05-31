import React, { useState, useEffect } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

import EditStudentModalContainer from '../../containers/students/EditStudentModalContainer';
import DeleteStudentContainer from '../../containers/students/DeleteStudentContainer';

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

const Row = ({ student }) => {
  const classes = useStyles();

  const [open, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  const handleDeleteModalOpen = state => {
    setDeleteModalOpen(state);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align='left'>{student.fullName}</StyledTableCell>
      <StyledTableCell align='center'>
        <DeleteStudentContainer
          open={deleteModalOpen}
          handleClickOpen={handleDeleteModalOpen}
          student={student}
        />
        <EditStudentModalContainer
          open={open}
          handleClickOpen={handleClickOpen}
        />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={() => handleDeleteModalOpen(true)}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          // onClick={() => handleClickOpen(true)}
        >
          Edit
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const StudentList = ({ docId, studentList, deleteStudent }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Name</StyledTableCell>
            <StyledTableCell align='center'>Tools</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList
            ? studentList.map((student, i) => (
                <Row key={i} student={student} deleteStudent={deleteStudent} />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;

import React from 'react';

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

import EditStudentModalContainer from '../../containers/students/EditStudentModalContainer';
import DeleteStudentContainer from '../../containers/students/DeleteStudentModalContainer';

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

const Row = ({ student, setModalOpen, setStudentToUpdate }) => {
  const classes = useStyles();

  const handleDeleteStudent = () => {
    setModalOpen('deleteStudent', true);
    setStudentToUpdate(student);
  };

  const handleEditStudent = () => {
    setModalOpen('editStudent', true);
    setStudentToUpdate(student);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align='left'>{student.fullName}</StyledTableCell>
      <StyledTableCell align='center'>
        <DeleteStudentContainer />
        <EditStudentModalContainer />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={handleDeleteStudent}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          onClick={handleEditStudent}
        >
          Edit
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const StudentListTable = ({
  studentList,
  setModalOpen,
  setStudentToUpdate
}) => {
  return studentList ? (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Name</StyledTableCell>
            <StyledTableCell align='center'>Tools</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map(student => (
            <Row
              key={student.docId}
              student={student}
              setModalOpen={setModalOpen}
              setStudentToUpdate={setStudentToUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>You currently have no student, add some now.</Typography>
  );
};

export default StudentListTable;

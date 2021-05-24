import React from 'react';
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

const Row = ({
  row: { docId, courseCode, courseName, students },
  classes,
  deleteClass
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align='left'>
        <Button
          className={classes.linkButton}
          component={Link}
          to={`/classes/${docId}`}
        >
          {courseCode}
        </Button>
      </StyledTableCell>
      <StyledTableCell align='left'>{courseName}</StyledTableCell>
      <StyledTableCell align='center'>
        {students ? students.length : 0}
      </StyledTableCell>
      <StyledTableCell align='center'>
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={() => deleteClass(docId)}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          component={Link}
          to={`/classes/${docId}`}
        >
          Edit
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const ClassListTable = ({ classList, deleteClass }) => {
  const classes = useStyles();

  return classList.length ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Course Code</StyledTableCell>
            <StyledTableCell align='left'>Course Name</StyledTableCell>
            <StyledTableCell align='center'># Students</StyledTableCell>
            <StyledTableCell align='center'>Tools</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classList.map(row => (
            <Row
              key={row.courseCode}
              row={row}
              classes={classes}
              deleteClass={deleteClass}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>You currently have no classes, add some now.</Typography>
  );
};

export default ClassListTable;

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

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

const rows = [
  {
    courseCode: 'ECE311',
    courseName: 'Computer System Architecture',
    units: 2
  },
  {
    courseCode: 'ECE311',
    courseName: 'Data Communication 1',
    units: 4
  },
  {
    courseCode: 'ENG241',
    courseName: 'Introduction to ENvironmental Engineering',
    units: 3
  },
  {
    courseCode: 'ENG411',
    courseName: 'Engineering Ethics and Computer Laws',
    units: 3
  },
  {
    courseCode: 'FILI101',
    courseName: 'Komunikasyon sa Akademikong Filipino',
    units: 2
  },
  {
    courseCode: 'ENG431',
    courseName: 'Seminars and Field Trip',
    units: 1
  }
];

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Course Code</StyledTableCell>
            <StyledTableCell align='left'>Course Name</StyledTableCell>
            <StyledTableCell align='left'>Units</StyledTableCell>
            <StyledTableCell align='left'>Tools</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ courseCode, courseName, units }, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align='left' component='th' scope='row'>
                {courseCode}
              </StyledTableCell>
              <StyledTableCell align='left'>{courseName}</StyledTableCell>
              <StyledTableCell align='left'>{units}</StyledTableCell>
              <StyledTableCell align='left'>
                {/* <Button
                  variant='outlined'
                  className={classes.redButton}
                  startIcon={<HighlightOffIcon />}
                >
                  Remove
                </Button> */}
                <Button
                  variant='outlined'
                  className={classes.redButton}
                  startIcon={<HighlightOffIcon />}
                >
                  Remove
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

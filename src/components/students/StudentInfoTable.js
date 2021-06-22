import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

const StudentInfoTable = ({ student, courseList }) => {
  const getStudentCourses = () =>
    courseList.filter(({ docId }) =>
      student.courses.some(course => course === docId)
    );

  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>
              <Typography gutterBottom variant='h6' component='h2'>
                About {student.fullName}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='left'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align='left'>Email</StyledTableCell>
            <StyledTableCell align='center'>{student.email}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Phone number</StyledTableCell>
            <StyledTableCell align='center'>
              {student.phoneNumber}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Enrolled in</StyledTableCell>
            <StyledTableCell align='center'>
              <List>
                {getStudentCourses().map(({ courseCode, courseName }, i) => (
                  <ListItem key={i} dense>
                    <ListItemText>
                      {courseCode} - {courseName}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align='left'>Date of Birth</StyledTableCell>
            <StyledTableCell align='center'>
              {student.dateOfBirth}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentInfoTable;

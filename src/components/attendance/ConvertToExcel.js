import React from 'react';
import { CSVLink } from 'react-csv';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    textDecoration: 'none'
  },
  download: {
    color: 'green',
    textDecoration: 'none',
    '&:hover': { color: 'white' }
  }
}));

const ConvertToExcel = ({ currentCourse }) => {
  const classes = useStyles();

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  const classDates = currentCourse.classDates
    .sort((a, b) => b.startDate - a.startDate)
    .map(date => moment(date.startDate).format('ddd, DD-MM-YYYY'));

  const createHeaders = keys =>
    keys.map(key => ({
      label: capitalize(key),
      key: key
    }));

  const getStudentAttendanceTotal = (docId, status) => {
    let attendance = { present: 0, absent: 0, excused: 0 };
    currentCourse.classDates.forEach(({ students }) => {
      students.forEach(
        student =>
          student.docId === docId &&
          student.attendanceStatus === capitalize(status) &&
          attendance[status]++
      );
    });
    return attendance[status];
  };

  const getStudentAttendance = studentDocId => {
    let attendanceStatusForDates = [];

    currentCourse.classDates.forEach(({ startDate, students }) => {
      students.forEach(({ docId, attendanceStatus }) => {
        if (docId === studentDocId)
          attendanceStatusForDates.push({
            [moment(startDate).format('ddd, DD-MM-YYYY')]: attendanceStatus
          });
      });
    });

    return Object.assign(...attendanceStatusForDates);
  };

  const headers = createHeaders(
    ['student', 'present', 'absent', 'excused'].concat(classDates.reverse())
  );

  const data = currentCourse.classDates[0].students.map(
    ({ fullName, docId }) => ({
      student: fullName,
      present: `${getStudentAttendanceTotal(docId, 'present')}`,
      absent: `${getStudentAttendanceTotal(docId, 'absent')}`,
      excused: `${getStudentAttendanceTotal(docId, 'excused')}`,
      ...getStudentAttendance(docId)
    })
  );

  return (
    <Button type='submit' variant='outlined' className={classes.greenButton}>
      <CSVLink
        data={data}
        headers={headers}
        className={classes.download}
        filename={`${currentCourse.courseCode}-attendance.csv`}
        target='_blank'
      >
        Download Excel Format
      </CSVLink>
    </Button>
  );
};

export default ConvertToExcel;

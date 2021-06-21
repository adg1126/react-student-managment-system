import { connect } from 'react-redux';
import _ from 'lodash';
import {
  selectCurrentCourse,
  selectCurrentDate
} from '../../redux/attendance/attendanceSelectors';

import { updateStudentAttendanceStatusStart } from '../../redux/attendance/attendanceActions';

import StudentList from '../../components/attendance/StudentList';

const mapStateToProps = state => {
  const students =
    !_.isEmpty(selectCurrentCourse(state)) &&
    !_.isEmpty(selectCurrentDate(state))
      ? _.compact(
          _.flatten(
            state.attendance.courseList[
              selectCurrentCourse(state).docId
            ].classDates.map(({ id, students }) =>
              id === selectCurrentDate(state).id ? students : null
            )
          )
        )
      : [];

  return {
    currentCourse: selectCurrentCourse(state),
    courseStudents: students
  };
};

export default connect(mapStateToProps, {
  updateStudentAttendanceStatusStart
})(StudentList);

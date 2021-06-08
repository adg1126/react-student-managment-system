import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage
} from '../../redux/courses/coursesSelectors';
import { selectStudentListForPreview } from '../../redux/student/studentSelectors';
import { selectAttendanceCourseListForPreview } from '../../redux/attendance/attendanceSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import { setCourseToUpdate } from '../../redux/courses/coursesActions';

import Attendance from '../../pages/Attendance';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  courseList: selectCourseListForPreview,
  studentList: selectStudentListForPreview,
  isFetching: selectIsCoursesFetching,
  errMessage: selectCoursesErrMessage,
  attendanceCourses: selectAttendanceCourseListForPreview
});

export default compose(
  connect(mapStateToProps, { setModalOpen, setCourseToUpdate }),
  WithSpinner
)(Attendance);

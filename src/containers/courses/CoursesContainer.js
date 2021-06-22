import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectCoursesStatus,
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage
} from '../../redux/courses/coursesSelectors';
import { selectStudentListForPreview } from '../../redux/student/studentSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import { setCurrentCourse } from '../../redux/courses/coursesActions';

import Courses from '../../pages/Courses';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  status: selectCoursesStatus,
  courseList: selectCourseListForPreview,
  studentList: selectStudentListForPreview,
  isFetching: selectIsCoursesFetching,
  errMessage: selectCoursesErrMessage
});

export default compose(
  connect(mapStateToProps, { setModalOpen, setCurrentCourse }),
  WithSpinner
)(Courses);

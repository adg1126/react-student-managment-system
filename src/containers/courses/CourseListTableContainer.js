import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching
} from '../../redux/courses/coursesSelectors';
import { selectStudentListForPreview } from '../../redux/student/studentSelectors';

import { deleteCourse } from '../../redux/courses/coursesActions';

import CourseListTable from '../../components/courses/CourseListTable';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  courseList: selectCourseListForPreview,
  isFetching: selectIsCoursesFetching,
  studentList: selectStudentListForPreview
});

export default compose(
  connect(mapStateToProps, { deleteCourse }),
  WithSpinner
)(CourseListTable);

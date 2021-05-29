import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage
} from '../../redux/courses/coursesSelectors';

import { deleteCourse } from '../../redux/courses/coursesActions';

import CourseListCard from '../../components/courses/CourseListCard';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  courseList: selectCourseListForPreview,
  isFetching: selectIsCoursesFetching,
  errMessage: selectCoursesErrMessage
});

export default compose(
  connect(mapStateToProps, { deleteCourse }),
  WithSpinner
)(CourseListCard);

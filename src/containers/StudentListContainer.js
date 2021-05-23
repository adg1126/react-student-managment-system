import { connect } from 'react-redux';

import { deleteStudent } from '../redux/classes/classesActions';

import StudentList from '../components/students/StudentList';

export default connect(null, { deleteStudent })(StudentList);

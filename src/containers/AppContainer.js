import { connect } from 'react-redux';
import { fetchClassesStart } from '../redux/classes/classesActions';
import App from '../App';

export default connect(null, {
  fetchClassesStart
})(App);

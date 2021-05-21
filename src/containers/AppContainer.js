import { connect } from 'react-redux';
import { fetchClasses } from '../redux/classes/classesActions';
import App from '../App';

export default connect(null, {
  fetchClasses
})(App);

import { connect } from 'react-redux';
import { fetchClasses } from '../redux/classes/classesActions';
import App from '../App';

const mapStateToProps = ({ classes: { classes } }) => ({
  classes
});

export default connect(mapStateToProps, {
  fetchClasses
})(App);

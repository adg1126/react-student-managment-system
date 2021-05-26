import { connect } from 'react-redux';
import { googleSignInStart, signUpStart } from '../redux/user/userActions';
import Signup from '../components/auth/Signup';

export default connect(null, { googleSignInStart, signUpStart })(Signup);

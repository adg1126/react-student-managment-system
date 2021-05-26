import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../redux/user/userActions';
import Signin from '../components/auth/Signin';

export default connect(null, { googleSignInStart, emailSignInStart })(Signin);

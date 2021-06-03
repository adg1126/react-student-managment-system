import { connect } from 'react-redux';
import { setModalOpen } from '../redux/modal/modalActions';
import { selectModalOpen } from '../redux/modal/modalSelectors';

import Modal from '../components/modal/Modal';

const mapStateToProps = (state, ownProps) => ({
  modalOpen: selectModalOpen(ownProps.modalName)(state)
});

export default connect(mapStateToProps, { setModalOpen })(Modal);

import {connect} from 'react-redux';
import {addChapter} from '../../actions';
import ChapterModal from './ChapterModal';

const mapStateToProps = (state, {params: {subject_key}}) => ({
    subject_key,
    editing: false
})

const mapDispatchToProps = dispatch => ({
    onPrimaryClick: data => dispatch(addChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterModal);

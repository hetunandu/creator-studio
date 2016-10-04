import {connect} from 'react-redux';
import {editChapter} from '../../actions';
import ChapterModal from './ChapterModal';

const mapStateToProps = ({chapters}, {params: {subject_key, chapter_key}}) => ({
    subject_key,
    editing: true,
    chapters: chapters,
    chapter_key
})

const mapDispatchToProps = dispatch => ({
    onPrimaryClick: data => dispatch(editChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterModal);

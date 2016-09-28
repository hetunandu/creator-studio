import {connect} from 'react-redux'
import ConceptPreview from './ConceptPreview'

const mapStateToProps = ({newConcept}) => ({
    concept: newConcept
})

export default connect(mapStateToProps)(ConceptPreview)
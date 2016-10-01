import {connect} from 'react-redux'
import ConceptCard from './ConceptCard'

const mapStateToProps = ({newConcept}) => ({
    concept: newConcept
})

export default connect(mapStateToProps)(ConceptCard)
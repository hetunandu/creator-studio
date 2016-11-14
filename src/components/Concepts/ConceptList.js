import React from 'react';
import {connect} from 'react-redux';
import {fetchConcepts, selectConcept} from '../../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Loading from '../Loading';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {browserHistory} from 'react-router';


const ConceptList = React.createClass({

	componentWillMount(){
		this.props.fetchConcepts(this.props.chapter_key)
	},
	
	render(){

		return (
			<div className="concept-list">
				<FloatingActionButton
				    mini={true}
				    backgroundColor='green'
				    style={{position: 'fixed', left: 20, top: 70}}
				    onTouchTap={this.handleConceptAdd}
				>
				    <ContentAdd />
				</FloatingActionButton>
				<h5 className="center">Index</h5>
				{this.props.concepts.isFetching ? <Loading /> : (
					<div>
						<p className="red-text"> {this.props.concepts.errorMessage} </p>
						<ol className="concept-index">
						{
							this.props.concepts.list.length > 0 ?
							
								this.props.concepts.list.map( concept =>
									<li key={concept.key}>
										<div
											className={
												this.props.concepts.selected.key === concept.key ?
													"concept-list-item selected" : "concept-list-item"
											}
											onClick={() => this.handleConceptSelection(concept.key)}
										>		
											{concept.name}
										</div>
									</li>
								)
							: <p>No Concepts</p>
						}
						</ol>
					</div>
				)}
			</div>
		);
	},

	handleConceptSelection(concept_key){
		this.props.selectConcept(concept_key)
	},


	handleConceptAdd(){
        browserHistory.push(`/chapters/${this.props.chapter_key}/new`)
    }
	
});

const mapDispatchToProps = dispatch => ({
	fetchConcepts: chapter_key => dispatch(fetchConcepts(chapter_key)),
	selectConcept: concept_key => dispatch(selectConcept(concept_key))
});

export default connect(null, mapDispatchToProps)(ConceptList)

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchConcepts} from '../../actions';

import ConceptCard from './ConceptCard';
import Loading from '../Loading'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const ConceptList = React.createClass({

    componentWillMount(){
        this.props.fetchConcepts(this.props.chapter_key)
    },

    render(){
        return (
            <div>
                {
                    this.props.concepts.isFetching ?
                    (
                        <p>Loading concepts...</p>
                    )
                    :
                    (
                        <div>
                            <Link
                              to={`/chapters/${this.props.chapter_key}/new`}
                            >
                              <FloatingActionButton
                                mini={true}
                                className="right"
                              >
                                <ContentAdd />
                              </FloatingActionButton>
                            </Link>
                            <h4 className="center">
                              {this.props.concepts.chapter.name}
                            </h4>
                            {this.props.concepts.isFetching && <Loading />}
                            <p className="red-text">
                              {this.props.concepts.errorMessage}
                            </p>
                            <div className="row">
                                {
                                    this.props.concepts.list.length > 0 ? 
                                        this.props.concepts.list.map( concept =>
                                            <div
                                              className="col m3"
                                              key={concept.key}
                                            >
                                                <ConceptCard concept={concept}/>
                                            </div>
                                        ) 
                                        : <p>No Concepts</p>
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
})



const mapStateToProps = ({concepts}, {params: {chapter_key} }) => ({
    concepts,
    chapter_key
})

const mapDispatchToProps = dispatch => ({
    fetchConcepts: chapter_key => dispatch(fetchConcepts(chapter_key))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptList)

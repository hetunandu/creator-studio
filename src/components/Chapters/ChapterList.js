import React from 'react';
import {connect} from 'react-redux';

import {fetchChapters, addChapter} from '../../actions';

import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Loading from '../Loading'

const ChapterList = React.createClass({

    componentDidMount(){
        this.props.fetchChapters(this.props.subject)
    },

    render(){
        return (
            <div className="section chapters">
                <FloatingActionButton mini={true} className="right" onClick={this.handleAddChapter}>
                    <ContentAdd />
                </FloatingActionButton>
                <h4 className="center">Chapters</h4>
                {this.props.chapters.isFetching && <Loading /> }
                <p className="center red-text">{this.props.chapters.errorMessage}</p>
                <div className="row">
                    {
                        this.props.chapters.list.length > 0 ?
                            this.props.chapters.list.map(chapter =>
                                <div className="col m3"  key={chapter.key}>
                                    <Paper zDepth={1} className="chapter-card">
                                        <IconMenu
                                            className="right"
                                            iconButtonElement={
                                    <IconButton><MoreVertIcon /></IconButton>
                                }
                                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        >
                                            <MenuItem
                                                primaryText="View Concepts"
                                                onClick={() => browserHistory.push(`/chapters/${chapter.key}`)}
                                            />
                                            <MenuItem
                                                primaryText="Edit Chapter"
                                                onClick={() => this.handleEditChapter(chapter)}
                                            />
                                            <MenuItem
                                                primaryText="Delete Chapter"
                                                onClick={() => this.handleDeleteChapter(chapter)}
                                            />
                                        </IconMenu>

                                        <h5>{chapter.name}</h5>
                                    </Paper>
                                </div>
                            )
                            : this.props.chapters.isFetching ?  "" : (<p>No Chapters found</p>)


                    }
                </div>
                {this.props.children}
            </div>
        );
    },


    handleAddChapter(){
        let link = `/subjects/${this.props.subject}/chapters/add`;
        browserHistory.push(link)
    },

    handleEditChapter(chapter){
      let link = `/subjects/${this.props.subject}/chapters/${chapter.key}/edit`;
      browserHistory.push(link)
    },

    handleDeleteChapter(chapter){
      let link = `/subjects/${this.props.subject}/chapters/${chapter.key}/delete`;
      browserHistory.push(link)
    }


});

const mapStateToProps = ({chapters}, {params: {subject_key}}) => ({
    subject: subject_key,
    chapters
})

const mapDispatchToProps = dispatch => ({
    fetchChapters: subject_key => dispatch(fetchChapters(subject_key)),
    addChapter: data => dispatch(addChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)

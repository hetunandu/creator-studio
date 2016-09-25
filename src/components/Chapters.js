import React from 'react';
import {connect} from 'react-redux';

import {fetchChapters, addChapter} from '../actions';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


const Chapters = React.createClass({

    render(){

        const addChapterStyle = {
            width: 500,
            padding: 10,
            marginBottom: 10,
        }

        const chaperCardStyle = {
            width: 300,
            padding: 10,
            marginTop: 10
        }

        return (
            <div className="section chapters">
                <h3>Chapters in {this.props.subject.name} ( {this.props.chapters.list.length}  )</h3>
                {this.props.chapters.isFetching &&
                    <p>Loading notes...</p>    
                }
                <p>{this.props.chapters.errorMessage}</p>
                <br/>
                <div>
                    <Paper zDepth={1} style={addChapterStyle}>
                        <h4>Create new chapter</h4>
                        <TextField ref="new_chapter_name" hintText="Type the name of the chapter"/>
                        <FlatButton label="Create" primary={true} onClick={this.handleAddChapter} />
                    </Paper>
                </div>
                <Divider />
                <div style={{ display: 'flex' }}>
                    {
                        this.props.chapters.list.map(chapter =>
                            <Paper zDepth={1} style={chaperCardStyle} key={chapter.key}>
                                <h4>{chapter.name}</h4>
                                <Divider />
                                <FlatButton label="View" primary={true}/>
                            </Paper>
                        ) 

                    }
                </div>

            </div>
        );
    },


    handleAddChapter(){
        let new_name = this.refs.new_chapter_name.input.value.trim()
        
        this.props.addChapter({name: new_name, subject_key: this.props.subject.key})

        this.refs.new_chapter_name.input.value = "";
    }
});

const mapStateToProps = ({subjects: {active}, chapters}) => ({
    subject: active,
    chapters
})

const mapDispatchToProps = dispatch => ({
    fetchChapters: subject_key => dispatch(fetchChapters(subject_key)),
    addChapter: data => dispatch(addChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chapters)
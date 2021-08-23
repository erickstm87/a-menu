import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { takeNotes } from '../actions/actions';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
});

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            default: 'Hold the mayo? Let us know here.'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(event) {
        this.setState({ value: event.target.value }, () => {
            // store.dispatch( {type: 'NOTES', payload: this.state.value} );
            let x = this.state.value;
            this.props.takeNotes({x});
        });
    }
    handleSubmit(event) {
        console.log(this.state.value);
        this.setState({default: 'Submitted!'});
        event.preventDefault();
        this.refs.form.reset();
    }
    render(){
        const { classes } = this.props;
       
        return(
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-multiline-static"
                    label="Notes:"
                    multiline
                    rows="4"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    ref='form'
                    value={this.props.notes !== '' ? this.props.notes : ''}
                    placeholder={this.state.default}
                />
            </form>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         examplePropOne: state.examplePropOne,
//         examplePropTwo: state.examplePropTwo
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ exampleAction }, dispatch)
// }


Notes.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		notes: state.state.notes
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ takeNotes }, dispatch)
}

const Note = withStyles(styles)(Notes);
// const Connected = connect(mapStateToProps, mapDispatchToProps)(Notes);

// export { Note };
export default connect(mapStateToProps, mapDispatchToProps)(Note);
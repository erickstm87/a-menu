import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { takeName } from '../actions/actions';

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

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            default: 'Name for the Order'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(event) {
        this.setState({ value: event.target.value }, () => {
            let x = this.state.value;
            this.props.takeName({x});
        });
    }
    handleSubmit(event) {
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
                    label="Name:"
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


Name.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		name: state.state.name
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ takeName }, dispatch)
}

const Names = withStyles(styles)(Name);

export default connect(mapStateToProps, mapDispatchToProps)(Names);
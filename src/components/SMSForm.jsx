
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { saveNumber } from '../actions/actions';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';


// class SMSForm extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           message: {
//             to: '',
//             body: 'your food is ready!'
//           },
//           submitting: false,
//           error: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     handleChange(event) {
//         const name = event.target.getAttribute('name');
//         this.setState({
//           message: { ...this.state.message, [name]: event.target.value }
//         }, () => {
//             let x = this.state.message.to;
//             this.props.saveNumber({x});
//         });
//     }

//     onSubmit(event) {
//         event.preventDefault();
//         this.setState({ submitting: true });
//         let x = this.state.message.to;
//         this.props.saveNumber({x});
//         fetch('/api/messages', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(this.state.message)
//         })
//           .then(res => res.json())
//           .then(data => {
//             if (data.success) {
//               this.setState({
//                 error: false,
//                 submitting: false,
//                 message: {
//                   to: '',
//                   body: ''
//                 }
//               });
//             } else {
//               this.setState({
//                 error: true,
//                 submitting: false
//               });
//               alert('need a valid number!');
//             }
//           })
//     }

//     render(){
//         return(
//             <form
//                 onSubmit={this.onSubmit}
//                 className={this.state.error ? 'error sms-form' : 'sms-form'}
//             >
//                 <div>
//                 <Typography variant="body1" align='center' gutterBottom>
//                     Let us know your number so we can text you when it's done
//                 </Typography>
                
//                 <TextField
//                     type='tel'
//                     name='to'
//                     id='to'
//                     label="Number"
//                     margin="dense"
//                     variant="outlined"
//                     value={this.state.message.to}
//                     onChange={this.handleChange}
//                 /> 
//                 </div>
//                 <Button type='submit 'variant="contained" disabled={this.state.submitting}>
//                     Confirmation
//                 </Button>
//             </form>
//         )
//     }
// }

// SMSForm.proptypes = {
//     classes: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => (
//     { savedNumber: state.state.to }
// )

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ saveNumber }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SMSForm);

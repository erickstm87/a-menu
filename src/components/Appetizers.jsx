import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSum } from '../actions/actions';
// import AppRouter from './Router';
import Note from './Notes';
import Names from './Name';
import db from '../firebase/init';
import { docNames } from '../firebase/init'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import teal from '@material-ui/core/colors/teal';

class Appetizers extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			sum: 0,
			orders: [0.00],
			added: false,
			foodOrder: [''],
			courseHeader: [''],
			counter: 0,
			allMenu: []
		}	
		this.newOrder = [];
	}

	componentDidMount() {
		let x = [];
		let y = [];
		let newDoc = [];
		const courseHeader = (docNames) => {
			let header, localCounter;
			switch (docNames) {
				case 'drink-menu':
					header = 'Drinks';
					break;
				case 'appetizer-menu':
					header = 'Appetizers';
					break;
				case 'entree-menu':
					header = 'Entrees';
					break;
				default:
					break;
			}
			localCounter = this.state.counter;
			this.setState({counter: localCounter+=1}, () => {
				y.push(header);
			});
			this.setState({courseHeader: y});
		}
		
		for(const doc in docNames) {
			let tempDocPort = [];
			db.collection(docNames[doc]).get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					x.push(doc.data());	
					tempDocPort.push(doc.data());
				});
				newDoc.push(tempDocPort)
				this.setState({allMenu: newDoc});
				return x;
			})
			.then((x) => {
				for(let i = 0; i < this.state.allMenu.length; i++) {
					this.setState(this.state.allMenu[i].map((element) => (
						element.amount = 0
					)))
				}
				this.setState({foodOrder: x});				
				
				courseHeader(docNames[doc]);
			})
		}
	}
	
    render(){
		
		let newSum = 0.00;
		let totalOrders = [];
		let prices;
		const nameStyle = {
		    "width": "25%"
		};
		const buttonStyle = {
			"width": "20%"
		}
		const descriptionStyle ={ 
		    "width": "42.5%"
		}
		const priceStyle = {
			"width": "12.5%"
		}
		const menuStyle = {
			"name": "viewport",
  			"minimum-scale": "1", 
			"initial-scale": "1", 
			"width":" device-width"
		}

		const theme = createMuiTheme({
			typography: {
				useNextVariants: true,
				fontSize: 18
			},
			palette: {
				type: 'light',
				primary: teal
			},
			root: {
				width: '100%',
				overflowX: 'auto',
			},
			table: {
				minWidth: 700,
			},
		});

		
		const changeAmount = (whatToDo, element) => {
			if(whatToDo === 'increase') {
				element.amount += 1;
				this.newOrder.push(element);
			}
			else if(whatToDo === 'decrease') {
				if(this.state.orders.includes(element)) {
					let newishArray = [...this.state.orders];
					let index = newishArray.findIndex(x => x.name === element.name);
					if(element.amount > 0){
						element.amount -= 1;
						newishArray.splice(index, 1);
					}
					this.newOrder = newishArray;
				}
			}
			
			prices = this.newOrder.map((element) => {
				let x = parseFloat(element.price);
				return Number.isFinite(x) ? x : 0.00;
			});
			totalOrders = this.newOrder.map((element) => {
				return element.name
			});

			try {
				newSum = prices.reduce((acc, element) => {
					return acc + element;
				});
			}
			catch(e){
				newSum = 0.00;
			}
			this.setState({
				sum: parseFloat(newSum).toFixed(2),
				orders: this.newOrder,
				foodOrder: totalOrders
			}, () => {
				
				let x = this.state.foodOrder;
				let y = this.state.sum;
				this.props.updateSum({x, y});
			});
		}
		
        return(
			<MuiThemeProvider theme={theme}>
			<Names />
            <Paper style={menuStyle}>	
				{this.state.allMenu.map((element, index) => (
				<div key={index*9}>
					<h2 key={index}>{this.state.courseHeader[index]}</h2>
					<Table key={index+1}>	
						<TableBody key={index+2}>
						{element.map((row, index) => (
							<TableRow key={index*8}>
								<TableCell style={buttonStyle} component="th" scope="row" key={index*12}>
								<Button  variant="contained" onClick={(e) => changeAmount('increase', row, index, e)}>+</Button> <Button variant="contained" onClick={(e) => changeAmount('decrease', row, index, e)}>-</Button>
								</TableCell>
								<TableCell style={nameStyle}>{row.name}</TableCell>
								<TableCell style={descriptionStyle} align="left">{row.description}</TableCell>
								<TableCell style={priceStyle} align="left">${row.price}</TableCell>
								<TableCell align="left">{row.amount}</TableCell>				
							</TableRow>	
						))}	
						</TableBody>			
					</Table>
				</div>
				))}
				<TextField
					id="filled-adornment-amount"
					variant="filled"
					label="Sum"
					value={ this.props.sum }
        		/>
				
				<Note />
			</Paper>			
			</MuiThemeProvider>
        )
    }
}
const mapStateToProps = (state) => {
	return {
		foods: state.state.foodOrder,
		sum: state.state.sum
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updateSum }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Appetizers);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSum } from '../actions/actions';
import AppRouter from './Router';
import Note from './Notes';
import Names from './Name';
import db from '../firebase/init';
import { dbName } from '../firebase/init'
import appMenu from '../data-store/App';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
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
			foodTemplate: ['']
		}	
		this.newOrder = [];
	}

	componentDidMount() {
		db.collection(dbName).get()
			.then((snapshot) => {
				let x = [];
				snapshot.forEach((doc) => {
					x.push(doc.data());
				})
				return x;
			})
			
			.then((x) => {
				x.map((element) => element.amount = 0);
				this.setState({foodOrder: x, foodTemplate: x});
			})
	}
	
    render(){
		let newSum = 0.00;
		let totalOrders = [];
		let prices;

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
				<h1>Menu</h1>
				<Names />
            <Paper>
				<Table >
					<TableHead>
					<TableRow>
						<TableCell>Add/Subtract</TableCell>
						<TableCell align="right">Item</TableCell>
						<TableCell align="right">Description</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantity</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{this.state.foodTemplate.map((row, index) => (
						<TableRow key={index}>
						<TableCell component="th" scope="row" key={index}>
						<Button variant="contained" onClick={(e) => changeAmount('increase', row, index, e)}>+</Button> <Button variant="contained" onClick={(e) => changeAmount('decrease', row, index, e)}>-</Button>
						</TableCell>
						<TableCell align="right">{row.name}</TableCell>
						<TableCell align="right">{row.description}</TableCell>
						<TableCell align="right">{row.price}</TableCell>
						<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}	
						
					</TableBody>					
				</Table>
				<TextField
					id="filled-adornment-amount"
					variant="filled"
					label="Sum"
					value={ this.props.sum }
        		/>
				
				<Note />
			</Paper>
			{/* <AppRouter /> */}
			
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
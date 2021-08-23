import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/styles.scss';
import './App.css';
// import ReactPageScroller from 'react-page-scroller';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Appetizers, PaymentForm, SMSForm } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loaded: false
    };
  }

  componentWillMount = () => {
      let sqPaymentScript = document.createElement('script');
      sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
      sqPaymentScript.type = 'text/javascript';
      sqPaymentScript.async = false;
      sqPaymentScript.onload = () => {
        this.setState({
          loaded: true
        })
      };
      document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  };

  goToPage = (pageNumber) => {
      this.reactPageScroller.goToPage(pageNumber);
  }

  render() {
    return (
      this.state.loaded &&
			<div className='App' id='main'>
          <MuiThemeProvider>
            <BrowserRouter>
              <Switch>
                  <Route path ='/payments' 
                      component={() => <PaymentForm paymentForm={window.SqPaymentForm} />}
                  />
                  <Route path='/confirmation' component={SMSForm} />
                  <Route path='/:businessName' component={Appetizers} />
                  <Route path= '/' exact component={Appetizers} />
              </Switch>
            </BrowserRouter>
          </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
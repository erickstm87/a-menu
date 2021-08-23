import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { store } from '../store/';
import { connect } from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';
import SMSForm from './SMSForm';

const styles = {
  name: {
    verticalAlign: "top",
    display: "none",
    margin: 0,
    border: "none",
    fontSize: "16px",
    fontFamily: "Helvetica Neue",
    padding: "16px",
    color: "#373F4A",
    backgroundColor: "transparent",
    lineHeight: "1.15em",
    placeholderColor: "#000",
    _webkitFontSmoothing: "antialiased",
    _mozOsxFontSmoothing: "grayscale"
  },
  leftCenter: {
    float: "left",
    textAlign: "center"
  },
  blockRight: {
    display: "block",
    float: "right"
  },
  center: {
    textAlign: "center"
  }
};

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBrand: "",
      nonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false,
      theName: ''
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
    this.updateTheName = this.updateTheName.bind(this);
  }

  updateTheName(event) {
    this.setState({theName: event.target.value}, () => {
        store.dispatch({type: 'NAME_ADDITION', payload: this.state.theName})
    });
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    const config = {
      applicationId: "sq0idp-Z5JGIKjy4k0H7dxqo1l9UA",
      locationId: "167QP2XTCH3YX",
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "16px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "1.15em",
          placeholderColor: "#000",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      applePay: {
        elementId: "sq-apple-pay"
      },
      masterpass: {
        elementId: "sq-masterpass"
      },
      googlePay: {
        elementId: "sq-google-pay"
      },
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "• • • •  • • • •  • • • •  • • • •"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip"
      },
      callbacks: {
        methodsSupported: methods => {
          if (methods.googlePay) {
            this.setState({
              googlePay: methods.googlePay
            });
          }
          if (methods.applePay) {
            this.setState({
              applePay: methods.applePay
            });
          }
          if (methods.masterpass) {
            this.setState({
              masterpass: methods.masterpass
            });
          }
          return;
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "MERCHANT NAME",
              amount: this.props.sum,
              pending: false
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: this.props.sum,
                pending: false
              }
            ]
          };
        },
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function(error) {
              console.log("  " + error.message);
            });

            return;
          }
          this.setState({
            nonce: nonce
          });
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              document.getElementById("error").innerHTML =
                "Please fix card information errors before continuing.";
              break;
            case "errorClassRemoved":
              document.getElementById("error").style.display = "none";
              break;
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                });
              } else {
                this.setState({
                  cardBrand: ""
                });
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        },
        paymentFormLoaded: function() {
          document.getElementById("name").style.display = "inline-flex";
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  render() {
    let sumTotal = this.props.sum;
    return (
      <div className="container">
        {console.log(sumTotal)}
        <div id="form-container">
          <div id="sq-walletbox">
            <button
              style={{ display: this.state.applePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-apple-pay"
            />
            <button
              style={{ display: this.state.masterpass ? "block" : "none" }}
              className="wallet-button"
              id="sq-masterpass"
            />
            <button
              style={{ display: this.state.googlePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-google-pay"
            />
            <hr />
          </div>

          <div id="sq-ccbox">
            <p>
              <span style={styles.leftCenter}>Enter Card Info Below </span>
              <span style={styles.blockRight}>
                {this.state.cardBrand.toUpperCase()}
              </span>
            </p>
            <div id="cc-field-wrapper">
              <div id="sq-card-number" />
              <input type="hidden" id="card-nonce" name="nonce" />
              <div id="sq-expiration-date" />
              <div id="sq-cvv" />
            </div>
            <input
              id="name"
              style={styles.name}
              type="text"
              placeholder="Name"
              onChange={this.updateTheName}
            />
            <div id="sq-postal-code" />
          </div>
              <HashRouter>
                  <Switch>
                  <Button 
                    className="button-credit-card"
                    onClick={this.requestCardNonce}
                    variant='contained'>
                      <NavLink to='/confirmation' activeClassName='active'>Pay ${sumTotal}</NavLink>
                  </Button>
                      <Route path='/confirmation' component={SMSForm} />
                  </Switch>
              </HashRouter>
        </div>
        <p style={styles.center} id="error" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {sum: state.state.sum}
}

export default connect(mapStateToProps, null)(PaymentForm);

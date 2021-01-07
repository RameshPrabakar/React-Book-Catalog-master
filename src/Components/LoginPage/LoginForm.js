import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion , Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
import { createBrowserHistory } from "history"
import { HttpService } from "../../shared/http-common";

export const history = createBrowserHistory()

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100
};

const panelStyle = {
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  width: 300,
};

const buttonStyle = {
  marginBottom: 0
};

const linkStyle = {
  paddingLeft: 20,
  paddingRight: 20
};

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
        formData: {},
        errors: {},
        formSubmitted: false,
        loading: false
    }
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
        formData: formData
    });
  } 
  validateLoginForm = (e) => {
  
      let errors = {};
      const { formData } = this.state;
  
      if (isEmpty(formData.email)) {
          errors.email = "Email can't be blank";
      } else if (!isEmail(formData.email)) {
          errors.email = "Please enter a valid email";
      }
  
      if (isEmpty(formData.password)) {
          errors.password = "Password can't be blank";
      }  else if (isContainWhiteSpace(formData.password)) {
          errors.password = "Password should not contain white spaces";
      } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
          errors.password = "Password's length must between 6 to 16";
      }
  
      if (isEmpty(errors)) {
          return true;
      } else {
          return errors;
      }
  }

  login = (e) => {
  
      e.preventDefault();
  
      let errors = this.validateLoginForm();
      const onSuccess = (data) => {
        if(data.status === 'Login Success') {
            history.push("/home");
            window.location.reload();
        } else {
            alert(data.status);
        }
     };
  
      const onFailure = error => {
        console.log('onFailure: ',error && error.response);
        alert(error.response);
      };
  
      if(errors === true){
        HttpService.post('/user/login', this.state.formData)
        .then(onSuccess)
        .catch(onFailure);
      } else {
          this.setState({
              errors: errors,
              formSubmitted: true
          });
          window.location.reload();
      }
  }

  render() {
    const { errors } = this.state;

    return (
      <div style={divStyle}>
        <Accordion className="panelStyle">
          <h2 className="loginHeader">Login</h2>

          <Form horizontal className="LoginForm" id="loginForm" onSubmit={this.login}>

            <FormGroup controlId="email" >
              <FormControl type="email" name="email" placeholder="Email Address" onChange={this.handleInputChange} />
              { errors.email &&
                 alert(errors.email)
              }
            </FormGroup>

            <FormGroup controlId="password" >
              <FormControl type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              { errors.password &&
                 alert(errors.password)
              }
            </FormGroup>

            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button type="submit">
                Login
              </Button>
              <Link style={linkStyle} to="/register">Create an account</Link>
            </FormGroup>
          </Form>
        </Accordion>
      </div>
    )
  }
}

export default LoginForm;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion , Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
import './LoginPage.css';
import { createBrowserHistory } from "history"
import { HttpService } from "../../shared/http-common";

export const history = createBrowserHistory();

  const divStyle = {
    display: 'flex',
    alignItems: 'center'
  };

 
  const buttonStyle = {
    marginBottom: 0
  };

  const linkStyle = {
    paddingLeft: 20,
    paddingRight: 20
  };

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
            formData: {},
			errors: {},
            formSubmitted: false,
            loading: false
		};
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

    validateRegistrationForm = (e) => {
  
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
    
    

    displayLogin = (e) => {
        e.preventDefault();
        let errors = this.validateRegistrationForm();

        const onSuccess = (data) => {
            console.log('onSuccess',data);
            if(data.status === 'Registration Success') {
                alert("You have successfully registered");
                history.push("/login");
                window.location.reload();
            } else {
                alert(data.status);
            }
        };
      
        const onFailure = error => {
            console.log('onFailure->',error && error.response);
            alert(error.response);
        };

        if(errors === true) {
            HttpService.post('/user/register', this.state.formData)
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
        
		return (
			<div className="LoginPage" style={divStyle}>
                <Accordion className="panelStyle">
                  <h2 className="loginHeader">User Registration</h2>

                  <Form horizontal className="LoginForm" id="registrationForm" onSubmit={this.displayLogin}>

                    <FormGroup controlId="fullname" >
                      <FormControl type="text" name="fullname" placeholder="Full name" 
                        onChange={this.handleInputChange} />
                     
                    </FormGroup>
                    
                    <FormGroup controlId="email" >
                      <FormControl type="email" name="email" placeholder="Email Address" 
                       onChange={this.handleInputChange} />
                     
                    </FormGroup>
                  
                    <FormGroup controlId="password" >
                      <FormControl type="password" name="password" placeholder="Password"
                      onChange={this.handleInputChange} />
                     
                    </FormGroup>
                  
                    <FormGroup style={buttonStyle} controlId="registrationFormSubmit">
                      <Button type="submit">Register</Button>
                      <Link style={linkStyle} to="/">Login Here</Link>
                    </FormGroup>
                 
                  </Form>
                </Accordion>     
			</div>
		);
	}
}

export default Register;
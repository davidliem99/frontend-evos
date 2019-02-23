import React, {Component} from 'react';
import '../../support/css/signin.css'
import { Button, Form, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onUserRegister} from '../../actions';
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Register extends Component{
    componentWillReceiveProps(newProps){
        console.log(newProps.username)
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
            cookies.set('idUser',newProps.id,{path: '/'})
        }
      }
      onBtnRegisterClick =()=> {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password= this.refs.password.value
        var password2= this.refs.password2.value
        if(password !== password2){
        return (<p>your password did'nt same</p>)
        }
        this.props.onUserRegister({username,email,password});
    
      }
      renderError=()=>{
        if(this.props.error.length>0){
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }
    
    render(){
        if(this.props.username===''){
        return(
            <div className="signin">
            <div className="container">
                <div className="row justify-content-md-center">
                <div className="col-md-12">
                        <Form  className="form-signin text-center" id="login-form">
                        {/* <img className="mb-4" src="/docs/4.2/assets/brand/bootstrap-solid.svg" alt width={72} height={72} /> */}
                        <h1 className="h3 mb-3 font-weight-normal">EVOS GOODS</h1>
                        <h2 className="h3 mb-3 font-weight-normal">Register here</h2>
                        <div className="form-group">
                        <label htmlFor="inputUsername" className="label-signin">Username:</label>
                    <input className="form-control" ref="username" type="text" name="name" id="name" placeholder="Your Username" />
                  </div>
                  <div className="form-group">
                  <label htmlFor="inputUsername" className="label-signin">Email:</label>
                    <input className="form-control" ref="email" type="email" name="email" id="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                  <label htmlFor="inputUsername" className="label-signin">Password:</label>
                    <input className="form-control" ref="password" type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                  <label htmlFor="inputUsername" className="label-signin">Re-Password:</label>
                    <input className="form-control" ref="password2" type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  
                        <div className="checkbox mb-3">
                        <label>
                        <Input type="checkbox" name="remember-me" id="remember-me" className="agree-term" /> Remember me
                        </label>
                        </div>
                        <div>
                    {this.renderError()}
                  </div>
                  <div className="form-group form-button">
                    <input onClick={this.onBtnRegisterClick} type="button" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                  </div>
                        {/* <p className="mt-5 mb-3 text-muted">© 2018-2019</p> */}
                        </Form>
                </div>
                    
                </div>
            </div>               
              </div>
        )
    }
    return <Redirect to="/homes"/>
  }
}
const mapStateToProps =(state)=>{
    return {
        username: state.auth.username,
        id:state.auth.id,
        error: state.auth.error,
        loading: state.auth.loading
    
    };
}
export default connect(mapStateToProps,{onUserRegister})(Register);
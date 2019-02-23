import React, {Component} from 'react';
import '../../support/css/signin.css'
import { Button, Form, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onUserLogin} from '../../actions';
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Login extends Component{
    componentWillReceiveProps(newProps){
        console.log(newProps.username)
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
            cookies.set('idUser',newProps.id,{path: '/'})
        }
      }
    onBtnLoginClick= ()=>{
        var username= this.refs.username.refs.tbusername.value;
        var password= this.refs.password.refs.tbpassword.value;
        this.props.onUserLogin({username, password});
    }
    renderError=()=>{
      if(this.props.loading == false){
        if(this.props.error.length>0){
          return <p className="alert alert-danger">{this.props.error}</p>
      }
      }
        
    }
    renderButton=()=>{
        if(this.props.loading){
            return <h3>Loading...</h3>
        }
        return <Button  onClick={this.onBtnLoginClick} type="submit" class="form-submit" >Log in</Button>

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
                        <h4 className="h3 mb-3 font-weight-normal">WELCOME !</h4>
                        <label htmlFor="inputUsername" className="label-signin">Username:</label>
                        <Input type="text" ref='username' innerRef='tbusername' placeholder='username' className="form-control" id="usr"/>
                        <label htmlFor="inputPassword" className="label-signin">Password:</label>
                        <Input type="password" ref='password' innerRef='tbpassword' placeholder='your password' className="form-control" id="pwd"/>
                        <div className="checkbox mb-3">
                        <label>
                        <Input type="checkbox" name="remember-me" id="remember-me" className="agree-term" /> Remember me
                        </label>
                        </div>
                        {this.renderError()}
                        {this.renderButton()}
                        {/* <p className="mt-5 mb-3 text-muted">© 2018-2019</p> */}
                        </Form>
                </div>
                    
                </div>
            </div>               
              </div>
        )
    }
    return <Redirect to="/"/>
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
export default connect(mapStateToProps,{onUserLogin})(Login);
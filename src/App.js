import React, { Component } from 'react';
import './support/css/bootstrap.css';
import './App.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './actions';
import {withRouter} from 'react-router-dom';
import Header from './component/fitur/navbar';
import Homepage from './component/screen/homepage';
import login from './component/screen/login';
import register from './component/screen/register';
import HomeUser from './component/screen/homeUser';
import ProdukDetail from './component/screen/produkDetail';
import Partners from './component/screen/partners';
import manage from './component/fitur/manage';
import manage1 from './component/fitur/manage1';
import Footer from './component/screen/footer';



const cookies = new Cookies();
class App extends Component {
  componentDidMount(){
    const cookienya = cookies.get("dataUser");
    if(cookienya !== undefined){
      this.props.keepLogin(cookienya);
    }else{
      this.props.cookieChecked()
    }
}
  render() {
    if(this.props.cookie){
      return (
        <div>  
            <Header/>
            <Route exact path='/' component={Homepage}/>
            <Route exact path='/login' component={login}/>
            <Route exact path='/register' component={register}/>
            <Route exact path='/store' component={HomeUser}/> 
            <Route exact path='/produkdetail' component={ProdukDetail}/>
            <Route exact path='/partners' component={Partners}/>
            <Route exact path='/manageproduk' component={manage}/>
            <Route exact path='/manageimage' component={manage1}/>
            <Footer/>
        </div>
      );
    }
    return(<div><center><h1>Loading...</h1></center></div>);
  }
}
const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}
export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));

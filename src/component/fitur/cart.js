import React from 'react';
import axios from 'axios';
import '../.././support/css/cart.css';
import Cookies from "universal-cookie";
import {deleteCart} from '../../actions';
import {connect} from 'react-redux';

const cookies = new Cookies();

class Cart extends React.Component{
    state={
        cart:[]
    }

    componentDidMount(){
        this.getListCart();
    }

    getListCart=()=>{
        axios.post("http://localhost:2000/cart", {
            username : cookies.get('dataUser')
        })
        .then((res)=>{
            this.setState({cart:res.data})
            console.log(this.state.cart)
        }).catch((err)=>{
            console.log(err)
        })
    }

    removeCart=(id)=>{
        console.log(id)
        if(id != undefined){
            var hapuscart = window.confirm('menghapus ?');
            if(hapuscart){
                this.props.deleteCart(id)
            }
        }
    }

    putOnCart=()=>{
        var cartData = this.state.cart.map((item)=>{
            var {id,nama,harga,gambar,qty}= item
            return(
                <tr>
                    <td>
                        <img src={gambar} height width="100px" className="img-responsive"/>
                        <p>{nama}</p>
                    </td>
                    <td>{harga}</td>
                    <td>{qty}</td>
                    <td>{harga * qty}</td>
                    <td><button className="btn" onClick={()=> this.removeCart(id)}>x</button></td>
                </tr>
            )
        })
        return cartData
    }

    totalHarga=()=>{
        var total = this.state.cart.reduce((sum,item) => (
            sum += item.qty * item.harga
        ), 0)
        return total
    }

    render(){
        return(
            <div className="container mt-5">
                <h1 align="center">My cart</h1>
                <table className="space-table">
                    <tr>
                        <th>
                            Produk
                        </th>
                        <th>
                            Harga
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            Subtotal
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                    {this.putOnCart()}
                    <tr>
                        <td className="noborder"></td>
                        <td className="noborder"></td>
                        <td>Total Harga</td>
                        <td>{this.totalHarga()}</td>
                        <td><button className="btn btn-secondary">Checkout</button></td>
                    </tr>
                </table>
                <a href="/store" className="back text-secondary">BACK TO STORE</a>
            </div>
        )
    }
}

export default connect(null,{deleteCart}) (Cart)
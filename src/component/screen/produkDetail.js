import React,{Component} from 'react';
import Axios from 'axios';
import queryString from 'query-string';
import {addToCart} from '../../actions';
import {connect} from 'react-redux';
import '../../support/css/inputnmbr.css';
import Cookies from "universal-cookie";

const cartdate = new Date();
const cookies = new Cookies();

class ProdukDetail extends Component{
    state={
        produk:[]
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var id_produk = params.id;
        this.renderDetailproduk(id_produk)
    }
    renderDetailproduk=(id_produk)=>{
        Axios.get("http://localhost:2000/produk-detail/"+id_produk)
        .then((res)=>{
            this.setState({produk:res.data})
            console.log(this.state.produk)
        }).catch((err)=>{
            console.log(err)
        })
    }

    addToUserCart=()=>{
        var params = queryString.parse(this.props.location.search)
        var id_produk = params.id;
        var username = cookies.get('dataUser');
        var numb = this.refs.number.value;
        console.log(numb);
        this.props.addToCart({username, id_produk, numb, cartdate});

    }

    prodDetail=()=>{
        var detailprod = this.state.produk.map((item)=>{
            var {id,kategori,nama,harga,image1,image2,image3}= item;
            return(
                <div className="row">
                    <div className="col-md-8">
                            <div className="produk-detail">
                            <img src={image1} className="img-responsive" height="518px" width="auto"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mt-5 h-90">
                            <h4>{nama}</h4>
                            <h4>Rp {harga}</h4>
                            <p>{kategori.toUpperCase()}</p>
                            <div>
                                <input type="number" className="inputnumber" ref="number" defaultValue="1" min="1"/>
                            </div>
                            <hr>
                            </hr>
                            <input className="btn btn btn-primary" type="button" value="Add To Cart" onClick={this.addToUserCart}/>
                        </div>

                    </div>
                </div>
            )
        })
        return detailprod
    }
    render(){
        return(
            <div className="container">
               {this.prodDetail()}
            </div>
        )
    }
}
export default connect(null,{addToCart})(ProdukDetail)
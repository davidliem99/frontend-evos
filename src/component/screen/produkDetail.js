import React,{Component} from 'react';
import Axios from 'axios';
import queryString from 'query-string'


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
                        <div className="border mt-5 h-90">
                            <h4>{nama}</h4>
                            <h4>Rp {harga}</h4>
                            <p>{kategori.toUpperCase()}</p>
                            <button className="btn btn btn-primary" type="button">Add to cart</button>
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
export default ProdukDetail
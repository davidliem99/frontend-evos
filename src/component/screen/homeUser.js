import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button, Input, Form, FormGroup } from 'reactstrap';
import Axios from 'axios';
import '../../support/css/list-margin.css'
const marRight = {marginRight: '20px'}

class HomeUser extends Component{
    state={
        produkList:[],
        searchProdukList:[]
    }
    componentDidMount(){
        this.getProduk()
    }
    getProduk=()=>{
        Axios.get("http://localhost:2000/list-produk")
        .then((res)=>{
            this.setState({produkList:res.data})
            console.log(this.state.produkList)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putprodukList=()=>{
        var produk = this.state.produkList.map((item)=>{
            var {id,nama,image,harga}= item
            return (
                <div className="col-md-4">
                <div className="space-list">
                <Card className='filter'>
                    <CardImg top width="100%" src={image} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{nama}</CardTitle>
                        <CardTitle>{harga}</CardTitle>
                        <a href={`/produkdetail?id=${id}`}><Button>Show Detail</Button></a>
                    </CardBody>
                </Card>
                </div>
            </div>
            )
        })
        return produk
    }
    fnFilterName = () => {
        let input = this.refs.filterName.refs.innerFilterName.value
        let filter = input.toUpperCase()
        let filterSelect = this.refs.select.refs.selectInner.value
        let nama = this.state.produkList
        let id = document.getElementsByClassName('filter')
        for(let i = 0 ; i <= nama.length-1 ; i ++){
          if(nama[i].nama.toUpperCase().indexOf(filter) > -1 && nama[i].kategori.indexOf(filterSelect) > -1){
            id[i].style.display = ''
          }else{
            id[i].style.display = 'none'
          }
        }
        
      }
      fnFilterPrice = ()=>{
        let from = this.refs.priceFrom.refs.priceFromInner.value
        let until = this.refs.priceUntil.refs.priceUntilInner.value
        let nama = this.state.produkList
        let id = document.getElementsByClassName('filter')
        for(let i = 0 ; i <= nama.length-1 ; i ++){
          if(nama[i].harga >= from && nama[i].harga <= until){
            id[i].style.display = ''
          }else{
            id[i].style.display = 'none'
          }
        }
      }
  
      fnFilterByKategori = () => {
        let filter = this.refs.select.refs.selectInner.value
        let filterName = this.refs.filterName.refs.innerFilterName.value
        let filterNameUpper = filterName.toUpperCase()
        let nama = this.state.listProduk
        let id = document.getElementsByClassName('filter')
        for(let i = 0 ; i <= nama.length-1 ; i ++){
          if(nama[i].kategori.indexOf(filter) > -1 && nama[i].namaproduk.toUpperCase().indexOf(filterNameUpper)> -1){
            id[i].style.display = ''
          }else{
            id[i].style.display = 'none'
          }
        }
  
        console.log(filter)
      }

    render(){
        return(
            <div className="container">
              <center><h1>EVOS STORE</h1></center>
              <center>
            <div style={{marginBottom: '20px' , marginLeft:'120px'}}>
              <Form inline>
              <Input type="text" style={marRight} placeholder = 'search by name' ref='filterName' innerRef="innerFilterName" onKeyUp={this.fnFilterName}/>
              <Input type="text" style={marRight} placeholder = 'price from' ref="priceFrom" innerRef="priceFromInner" onKeyUp={this.fnFilterPrice}/>
              <Input type="text" style={marRight} placeholder = 'until' ref="priceUntil" innerRef="priceUntilInner" onKeyUp={this.fnFilterPrice} />
              <FormGroup>
              {/* <Label for="exampleSelect">Select</Label> */}
              <Input type="select" name="select"  ref="select" innerRef='selectInner' onClick={this.fnFilterByKategori}>
                <option value="">Filter By Kategori</option>
                <option value="Makanan">T-SHIRT</option>
                <option value="Minuman">WRISTBAND</option>
                <option value="Desert">KEYCHAIN</option>
              </Input>
            </FormGroup>
              </Form>
            </div>
            </center>
                <div className="row">
                   {this.putprodukList()}
                </div>
             </div>
        )
    }
}
export default HomeUser
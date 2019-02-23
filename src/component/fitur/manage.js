import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

class manageProduk extends Component {
  state = {
    namaproduk: "",
    hargaproduk: "",
    kategoriproduk: "",
    listproduk: [],
    selectedEdit: 0
  };

  componentDidMount = () => {
    this.getprodukList();
  };

  getprodukList = () => {
    axios
      .get("http://localhost:2000/produk")
      .then(res => {
        console.log(res.data);
        this.setState({ listproduk: res.data, selectedEdit: 0 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddClick = event => {
    var {namaproduk,hargaproduk,kategoriproduk} = this.state;

    axios
      .post("http://localhost:2000/produk-add", {
        namaproduk,hargaproduk,kategoriproduk
      })
      .then(res => {
        this.getprodukList();

      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSaveClick = id => {
    var {namaproduk,hargaproduk,kategoriproduk} = this.state;
    axios
      .post("http://localhost:2000/produk-edit/" + id, {
        namaproduk,hargaproduk,kategoriproduk
      })
      .then(res => {
        this.getprodukList();
        alert(`Sukses update produk!`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteClick = id => {
    if (window.confirm("ARE YOU SURE ??")) {
      axios
        .delete("http://localhost:2000/produk-delete/" + id)
        .then(res => {
          this.getprodukList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderproduk = () => {
    var listJSXproduk = this.state.listproduk.map(item => {
      if (this.state.selectedEdit === item.id) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input
                type="text"
                name="namaproduk"
                defaultValue={item.namaproduk}
                onChange={this.handleChange}
                
              />
            </td>
            <td>
              <input
                type="text"
                name="hargaproduk"
                defaultValue={item.hargaproduk}
                onChange={this.handleChange}
                
              />
            </td>
            <td>
            <select
                name="kategoriproduk"
                defaultValue={item.kategoriproduk}
                onChange={this.handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
            </td>
            <td>
              <input
                className="btn btn-primary"
                type="button"
                value="Save"
                onClick={() => this.handleSaveClick(item.id)}
              />
            </td>
            <td>
              <input
                className="btn btn-danger"
                type="button"
                value="Cancel"
                onClick={() => this.setState({ selectedEdit: 0 })}
              />
            </td>
          </tr>
        );
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.namaproduk}</td>
          <td>{item.hargaproduk}</td>
          <td>{item.kategoriproduk}</td>
          <td>
            <input
              className="btn btn-primary"
              type="button"
              value="Edit"
              onClick={() => this.setState({ selectedEdit: item.id })}
            />
          </td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              value="Delete"
              onClick={() => this.handleDeleteClick(item.id)}
            />
          </td>
        </tr>
      );
    });
    return listJSXproduk;
  };

  render() {
    const hStyle = {
      textAlign: "center",
      paddingTop: "50px"
    };
    return (
      <div>
        <h1 style={hStyle}>Manage Produk</h1>
        <div>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Kategori</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{this.renderproduk()}</tbody>
            <tfoot>
              <td />
              <td>
                <input
                  type="text"
                  name="namaproduk"
                  placeholder="Nama Produk"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hargaproduk"
                  placeholder="Harga"
                  onChange={this.handleChange}
                />
              </td>
              <td>
              <select
                name="kategoriproduk"
                onChange={this.handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-success"
                  value="Add"
                  onClick={this.handleAddClick}
                />
              </td>
            </tfoot>
          </Table>
        </div>
      </div>
    );
  }
}

export default manageProduk;
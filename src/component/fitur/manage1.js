import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

class manageImage extends Component {
  state = {
    id_produk: "",
    img1: "",
    img2: "",
    img3:"",
    listimage: [],
    selectedEdit: 0
  };

  componentDidMount = () => {
    this.getimage();
  };

  getimage = () => {
    axios
      .get("http://localhost:2000/img")
      .then(res => {
        console.log(res.data);
        this.setState({ listimage: res.data, selectedEdit: 0 });
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
    var {id_produk,img1,img2,img3} = this.state;

    axios
      .post("http://localhost:2000/img-add", {
        id_produk,img1,img2,img3
      })
      .then(res => {
        this.getimage();

      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSaveClick = id => {
    var {img1,img2,img3} = this.state;
    axios
      .post("http://localhost:2000/img-edit/" + id, {
        img1,img2,img3
      })
      .then(res => {
        this.getimage();
        alert(`Sukses update produk!`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteClick = id => {
    if (window.confirm("ARE YOU SURE ??")) {
      axios
        .delete("http://localhost:2000/img-delete/" + id)
        .then(res => {
          this.getimage();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderproduk = () => {
    var listJSXitem = this.state.listimage.map(item => {
      if (item.id !== this.state.selectedEdit) {
        return (
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.id_produk}</td>
          <td><img src={item.img1} width="100px" alt="" /></td>
          <td><img src={item.img2} width="100px" alt="" /></td>
          <td><img src={item.img3} width="100px" alt="" /></td>
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
      }
      return (
        <tr>
            <td>{item.id}</td>
            <td>
              {item.id_produk}
            </td>
            <td>
              <input
                type="text"
                defaultValue={item.img1}
                name="img1"
                onChange={this.handleChange}
              />
            </td>
            <td>
            <input
                type="text"
                defaultValue={item.img2}
                name="img2"
                onChange={this.handleChange}
              />
            </td>
            <td>
            <input
                type="text"
                defaultValue={item.img3}
                name="img3"
                onChange={this.handleChange}
              />
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
    });
    return listJSXitem;
  };

  render() {
    const hStyle = {
      textAlign: "center",
      paddingTop: "50px"
    };
    return (
      <div>
        <h1 style={hStyle}>MANAGE IMAGE</h1>
        <div>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>ID</th>
                <th>id_produk</th>
                <th>image 1</th>
                <th>image 2</th>
                <th>image 3</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{this.renderproduk()}</tbody>
            <tfoot>
              <td />
              <td>
                <input
                  type="number"
                  name="id_produk"
                  placeholder="id_produk"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="img1"
                  placeholder="img1"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="img2"
                  placeholder="img2"
                  onChange={this.handleChange}
                />
                </td>
                <td>
                <input
                  type="text"
                  name="img3"
                  placeholder="img3"
                  onChange={this.handleChange}
                />
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

export default manageImage;
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Item extends Component {
  state = {
    token: "",
    item: null,
  };

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const idItem = params.get("idItem");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://18.141.178.15:8080/item/${idItem}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          item: result.data,
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    console.log(this.state.item);
    return (
      <div className="container">
        <button
          onClick={() => {
            this.props.history.goBack();
          }}
          className="btn btn-warning"
        >
          Back
        </button>
        {this.state.item !== null ? (
          <div>
            <div>Name : {this.state.item.name}</div>
            <div>
              Status :{" "}
              {this.state.item.itemCompletionStatus === false
                ? "Unchecked"
                : "Checked"}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Item);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "../Component/ReactTable";
import ReactModal from "react-modal";

class Checklist extends Component {
  state = {
    head: [
      {
        Header: "Checklist",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Nama",
            accessor: "name",
            sortType: "basic",
          },

          {
            Header: "Action",
            accessor: "id",
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.onClickDelete(row.original.id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    this.viewCheckListDetail(row.original.id);
                  }}
                  className="btn btn-info ml-2"
                >
                  View
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    content: [],
    token: "",
    showModal: false,
    inputName: "",
  };

  viewCheckListDetail = (id) => {
    this.props.history.push(
      `/checklist-detail?token=${this.state.token}&idChecklist=${id}`
    );
  };

  onClickDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.state.token}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://18.141.178.15:8080/checklist/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchCheckList();
      })
      .catch((error) => console.log("error", error));
  };

  fetchCheckList = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://18.141.178.15:8080/checklist", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          content: result.data,
          token: token,
        });
      })
      .catch((error) => console.log("error", error));
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputName: "",
    });
  };

  onChangeName = (event) => {
    this.setState({
      inputName: event.target.value,
    });
  };

  handleAddButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.state.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ name: this.state.inputName });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://18.141.178.15:8080/checklist", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchCheckList();
        this.handleCloseModal();
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchCheckList();
  }

  render() {
    return (
      <div className="container">
        {/* MODAL */}
        <ReactModal
          isOpen={this.state.showModal}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <h5>Add Checklist</h5>

          <div className="mb-3">
            <div>Name</div>
            <input
              value={this.state.inputName}
              onChange={this.onChangeName}
              type="text"
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success"
              onClick={() => {
                this.handleAddButton();
              }}
            >
              Add
            </button>

            <button className="btn btn-light" onClick={this.handleCloseModal}>
              Cancel
            </button>
          </div>
        </ReactModal>
        {/* CONTENT */}
        <div className="card shadow bg-white p-2 mt-3">
          <div className="d-flex mb-2">
            <button onClick={this.openModal} className="btn btn-success">
              Add Checklist
            </button>
          </div>
          <ReactTable
            head={this.state.head}
            body={this.state.content}
          ></ReactTable>
        </div>
      </div>
    );
  }
}

export default withRouter(Checklist);

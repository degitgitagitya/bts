import React, { Component } from "react";
import ReactTable from "../Component/ReactTable";
import { withRouter } from "react-router-dom";
import ReactModal from "react-modal";

class ChecklistDetail extends Component {
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
            Header: "Status",
            accessor: "itemCompletionStatus",
            Cell: ({ row }) =>
              row.original.itemCompletionStatus === false ? (
                <button
                  onClick={() => {
                    this.changeStatus(row.original.id);
                  }}
                  className="btn btn-danger"
                >
                  Unchecked
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.changeStatus(row.original.id);
                  }}
                  className="btn btn-success"
                >
                  Checked
                </button>
              ),
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
                    this.viewItem(row.original.id);
                  }}
                  className="btn btn-info ml-2"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    this.openModalEdit(row.original.id, row.original.name);
                  }}
                  className="btn btn-warning ml-2"
                >
                  Edit
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
    idChecklist: "",
    edit: false,
    idDetail: "",
  };

  viewItem = (id) => {
    this.props.history.push(`/item?token=${this.state.token}&idItem=${id}`);
  };

  changeStatus = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.state.token}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://18.141.178.15:8080/item/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchChecklistDetail();
      })
      .catch((error) => console.log("error", error));
  };

  fetchChecklistDetail = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const idChecklist = params.get("idChecklist");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://18.141.178.15:8080/checklist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let temp = result.data.filter(
          (data) => data.id === parseInt(idChecklist)
        );

        if (temp[0].items !== null) {
          this.setState({
            content: temp[0].items,
            idChecklist: parseInt(idChecklist),
            token: token,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  openModalEdit = (id, name) => {
    this.setState({
      showModal: true,
      edit: true,
      idDetail: id,
      inputName: name,
    });
  };

  editCheckListDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.state.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      checklistId: this.state.idChecklist,
      itemName: this.state.inputName,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://18.141.178.15:8080/item/rename/${this.state.idDetail}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchChecklistDetail();
        this.handleCloseModal();
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchChecklistDetail();
  }

  openModal = () => {
    this.setState({
      showModal: true,
      edit: false,
    });
  };

  onChangeName = (event) => {
    this.setState({
      inputName: event.target.value,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputName: "",
    });
  };

  handleAddButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.state.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      checklistId: this.state.idChecklist,
      itemName: this.state.inputName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://18.141.178.15:8080/item", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchChecklistDetail();
        this.handleCloseModal();
      })
      .catch((error) => console.log("error", error));
  };

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
            {this.state.edit === false ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  this.handleAddButton();
                }}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => {
                  this.editCheckListDetail();
                }}
              >
                Edit
              </button>
            )}

            <button className="btn btn-light" onClick={this.handleCloseModal}>
              Cancel
            </button>
          </div>
        </ReactModal>
        {/* CONTENT */}
        <div className="card shadow bg-white p-2 mt-3">
          <div className="d-flex justify-content-between mb-2">
            <button onClick={this.openModal} className="btn btn-success">
              Add Checklist
            </button>
            <button
              onClick={() => {
                this.props.history.goBack();
              }}
              className="btn btn-warning"
            >
              Back
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

export default withRouter(ChecklistDetail);

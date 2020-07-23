import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    inputEmail: "",
    inputUsername: "",
    inputPassword: "",
  };

  onChangeEmail = (event) => {
    this.setState({
      inputEmail: event.target.value,
    });
  };

  onChangeUsername = (event) => {
    this.setState({
      inputUsername: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      inputPassword: event.target.value,
    });
  };

  registerAccount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: this.state.inputEmail,
      password: this.state.inputPassword,
      username: this.state.inputUsername,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://18.141.178.15:8080/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push("/login");
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 p-3 card mt-5">
            <h4 className="text-center">Register</h4>
            <div>
              <div>Email</div>
              <input
                value={this.state.inputEmail}
                onChange={this.onChangeEmail}
                className="form-control"
                type="email"
              />
            </div>
            <div>
              <div>Username</div>
              <input
                value={this.state.inputUsername}
                onChange={this.onChangeUsername}
                className="form-control"
                type="text"
              />
            </div>
            <div>
              <div>Password</div>
              <input
                value={this.state.inputPassword}
                onChange={this.onChangePassword}
                className="form-control"
                type="password"
              />
            </div>
            <div>
              <button
                onClick={this.registerAccount}
                className="btn form-control btn-success mt-3"
              >
                Register
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/login");
                }}
                className="btn btn-info form-control mt-3"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);

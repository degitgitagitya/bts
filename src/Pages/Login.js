import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    inputUsername: "",
    inputPassword: "",
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

  authAccount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      password: this.state.inputPassword,
      username: this.state.inputUsername,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://18.141.178.15:8080/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push(`/checklist?token=${result.data.token}`);
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 mt-5 card p-3">
            <h4 className="text-center">Login</h4>
            <div>
              <div>Username</div>
              <input
                value={this.state.inputUsername}
                onChange={this.onChangeUsername}
                type="text"
                className="form-control"
              />
            </div>
            <div>
              <div>Password</div>
              <input
                value={this.state.inputPassword}
                onChange={this.onChangePassword}
                type="password"
                className="form-control"
              />
            </div>
            <button
              onClick={this.authAccount}
              className="btn btn-info mt-3 form-control"
            >
              Login
            </button>
            <button
              onClick={() => {
                this.props.history.push("/");
              }}
              className="btn btn-success mt-3 form-control"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

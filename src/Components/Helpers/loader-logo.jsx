import React, { Component } from "react";

class LoaderLogo extends Component {
  render() {
    return (
      <div class="lds-ellipsis">
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
        <div style={{ backgroundColor: "Highlight" }} />
      </div>
    );
  }
}

export default LoaderLogo;

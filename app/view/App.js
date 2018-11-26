import React, { Component } from "react";
var CanvasJSReact = require("./canvasjs.react");
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>In front end</h1>
        <Form />
        <List />
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.url = React.createRef();
    this.data = React.createRef();
    this.method = React.createRef();
  }

  handleClick = () => {
    var data = {
      url: this.url.current.value,
      data: this.data.current.value,
      method: this.method.current.value
    };
    fetch("http://localhost:8000/api/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <input placeholder="URL" ref={this.url} />
        <br />
        <input placeholder="Data" ref={this.data} />
        <br />
        <input placeholder="Method" ref={this.method} />
        <br />
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedItem: null
    };
    this.getList();
  }

  getList = () => {
    fetch("http://localhost:8000/api/", {
      method: "get"
    })
      .then(res => res.json())
      .then(res => this.setState({ data: res.data }));
  };

  handleClick = id => {
    fetch(`http://localhost:8000/api/${id}`, {
      method: "get"
    })
      .then(res => res.json())
      .then(res => this.setState({ selectedItem: res }));
  };

  handleDelete = id => {
    fetch(`http://localhost:8000/api/${id}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(res => alert(res.success));
  };

  render() {
    return (
      <div>
        <h3>List</h3>
        <ul>
          {this.state.data.map(item => (
            <li key={item._id}>
              {item.url}
              <button
                onClick={() => {
                  this.handleClick(item._id);
                }}
              >
                View
              </button>
              <button
                onClick={() => {
                  this.handleDelete(item._id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {this.state.selectedItem && <Item data={this.state.selectedItem} />}
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h4>{this.props.data.url}</h4>
        <h4>Percentils 50: {this.props.data.percentile_50}</h4>
        <h4>Percentils 75: {this.props.data.percentile_75}</h4>
        <h4>Percentils 95: {this.props.data.percentile_95}</h4>
        <h4>Percentils 99: {this.props.data.percentile_99}</h4>
        {this.props.data.sync_status && (
          <Graph dataPoints={this.props.data.responses} />
        )}
        {!this.props.data.sync_status && <h2>Syncing responses</h2>}
      </div>
    );
  }
}

class Graph extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.dataPoints);
  }

  getDataPoints = () => {
    let dp = [];
    for (var i = 0; i < this.props.dataPoints.length; i++) {
      dp.push({ x: i + 1, y: this.props.dataPoints[i] });
    }
    return dp;
  };

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Responses"
      },
      axisY: {
        includeZero: false,
        title: "Response Time (in ms.)"
      },
      axisX: {
        title: "Request No."
      },
      data: [
        {
          type: "area",
          dataPoints: this.getDataPoints()
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

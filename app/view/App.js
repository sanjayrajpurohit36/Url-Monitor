import React, { Component } from "react";
import UrlStore from "./UrlStore";
import { observer } from "mobx-react";
import { observable, observe } from "mobx";
var CanvasJSReact = require("./canvasjs.react");
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

@observer
class List extends Component {
  @observable data = [];
  @observable selectedItem = null;

  constructor(props) {
    super(props);
    this.url_data = new UrlStore();
    this.getList();
    this.url = React.createRef();
  }

  getList = () => {
    this.url_data.getData().then(res => {
      this.data = res;
    });
  };

  handleDelete = id => {
    fetch(`http://localhost:8000/api/${id}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(res => this.getList());
  };

  handleAdd = () => {
    var newdata = {
      url: this.url.current.value
    };
    this.url_data.addData(newdata).then(res => {
      this.getList();
    });
  };

  handleClick = id => {
    this.selectedItem = id;
  };

  render() {
    return (
      <div>
        <input placeholder="URL" ref={this.url} />
        <button onClick={this.handleAdd}>Add</button>
        <h3>List</h3>
        <ul>
          {this.data &&
            this.data.map(item => (
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
        {this.selectedItem && <Item id={this.selectedItem} />}
      </div>
    );
  }
}

@observer
class Item extends Component {
  @observable data = { responses: [], sync_status: false };

  constructor(props) {
    super(props);
    this.getItem(this.props.id);
  }

  componentDidUpdate(nextProps) {
    if (this.props.id != this.data._id || !this.data.sync_status)
      this.getItem(this.props.id);
  }

  getItem = id => {
    fetch(`http://localhost:8000/api/${id}`, {
      method: "get"
    })
      .then(res => res.json())
      .then(res => (this.data = res));
  };

  render() {
    return (
      <div>
        <h3>
          <center>{this.data.url}</center>
        </h3>
        <Graph dataPoints={this.data.responses} />
      </div>
    );
  }
}

@observer
class Graph extends Component {
  @observable plotPoints = [];

  constructor(props) {
    super(props);
    this.getDataPoints(this.props.dataPoints);
  }

  componentDidUpdate(nextProps) {
    let pp = [];
    let flag = true;
    for (let i = 0; i < this.plotPoints.length; i++) {
      pp.push(this.plotPoints[i]["y"]);
      if (this.plotPoints[i]["y"] == this.props.dataPoints.slice(i))
        flag = false;
    }
    console.log(pp, this.props.dataPoints.slice());
    if (flag) this.getDataPoints(this.props.dataPoints);
  }

  getDataPoints = points => {
    this.plotPoints = [];
    for (let i = 0; i < points.length; i++) {
      this.plotPoints = this.plotPoints.concat({ x: i + 1, y: points[i] });
    }
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
          dataPoints: this.plotPoints
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

export default App;

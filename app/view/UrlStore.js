import { observable, action } from "mobx";

class UrlStore {
  @observable data = [{ hi: 5 }];

  @action getData() {
    console.log("Called");
    let that = this;
    return fetch("http://localhost:8000/api/", {
      method: "get"
    })
      .then(res => res.json())
      .then(res => {
        return (that.data = res.data);
      });
  }

  addData(data) {
    return fetch("http://localhost:8000/api/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
}

export default UrlStore;

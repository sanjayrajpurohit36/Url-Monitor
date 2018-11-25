var Url = require("../app/models/url.model");
var request = require("request");

module.exports = {
  create: data => {
    var url = new Url(data);
    return url.save();
  },

  find: id => {
    console.log(id);
    return Url.find({ _id: id });
  },

  all: () => {
    return Url.find();
  },

  update: (id, data) => {
    return Url.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          url: data.url,
          method: data.method,
          data: data.data,
          responses: data.responses,
          headers: data.headers,
          sync_status: data.sync_status
        }
      }
    );
  },

  delete: id => {
    return Url.deleteOne({ _id: id });
  },

  hit_data: data => {
    var counter = 0;
    var response_times = [];
    var headers;
    var refresh = setInterval(() => {
      console.log("Hitting", counter, data.url);
      request.get(
        {
          url: data.url,
          time: true
        },
        (err, res) => {
          response_times.push(res.elapsedTime);
          headers = res.headers;
        }
      );
      counter++;
      if (counter == 100) {
        var sorted = response_times.slice();
        sorted.sort();
        let url = null;
        Url.find(data._id).then(res => {
          url = res[0];
          url.responses = response_times;
          url.headers = JSON.stringify(headers);
          url.percentile_50 = sorted[49];
          url.percentile_75 = sorted[74];
          url.percentile_95 = sorted[94];
          url.percentile_99 = sorted[98];
          url.sync_status = true;
          url.save().then(res => {
            console.log("Updated");
            clearInterval(refresh);
          });
        });
      }
    }, 1000);
  }
};

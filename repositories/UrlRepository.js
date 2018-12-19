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
          responses: data.responses,
          sync_status: data.sync_status
        }
      }
    );
  },

  delete: id => {
    return Url.deleteOne({ _id: id });
  },

  hit_data: data => {
    var refresh = setInterval(() => {
      if (data.sync_status) return;
      console.log("Hitting", data.url);
      request.get(
        {
          url: data.url,
          time: true
        },
        (err, urlHitData) => {
          Url.find(data._id).then(res => {
            url = res[0];
            url.responses.push(urlHitData.elapsedTime);
            if (url.responses.length == 10) {
              url.sync_status = true;
              clearInterval(refresh);
            }
            url.save().then(res => {});
          });
        }
      );
    }, 1000);
  }
};

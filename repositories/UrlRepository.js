var Url = require("../app/models/url.model")
var request = require("request")

module.exports = {
    create: data => {
        var url = new Url(data)
        return url.save()
    },

    find: id => {
        return Url.find({id})
    },

    update: (id, data) => {
        return Url.findOneAndUpdate({ "id": id }, 
        {   
            $set: {
                "url": data.url,
                "method": data.method,
                "data": data.data,
                "responses": data.responses,
                "headers": data.headers,
                "sync_status": data.sync_status
            }
        })
    },

    delete: id => {
        return Url.deleteOne({ "id": id }) 
    },

    hit_data: data => {
        var counter = 0;
        var response_times = [];
        var headers;
        var refresh = setInterval(() => {
            console.log("Hitting", counter, data.url);
            request.get({
                url: data.url, 
                time: true
            },(err, res) => {
                response_times.push(res.elapsedTime);
                headers = res.headers;
            })
            counter++;
            if(counter == 101)
            {
                console.log("Hitting", data.url, counter);
                var sorted = response_times.slice();
                sorted.sort();
                Url.findOneAndUpdate({ "id": data.id }, 
                {   
                    $set: {
                        "responses": response_times,
                        "headers": JSON.stringify(headers),
                        "percentile_50": sorted[50],
                        "percentile_75": sorted[75],
                        "percentile_95": sorted[95],
                        "percentile_99": sorted[99],
                        "sync_status": "true"
                    }
                }).then(res => {
                    console.log("Updated");
                    clearInterval(refresh);
                });
            }
        }, 1000)
    }
}
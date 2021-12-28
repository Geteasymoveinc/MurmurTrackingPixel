var coords = null;
if (navigator.geolocation) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(success, error, options);
} else {
  console.log("Geolocation is not supported");
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);

  axios
    .get(
      "https://api.ipstack.com/check?access_key=aec1bf893b74676751fa3eb162993f4d"
    )
    .then((response) => {
      axios.post(
        "https://backendapp.murmurcars.com/api/v1/campaignanalytics/location",
        {
          advertiser: "Easymove",
          response: response.data,
          geolocation: { latitude: null, longitude: null },
          date: new Date(),
        }
      );
    })
    .catch((error) => console.log("this is error", { error }));
}
function success(pos) {
  axios
    .get(
      "http://api.ipstack.com/check?access_key=aec1bf893b74676751fa3eb162993f4d"
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.log({ error }));

  Pos = pos;
  axios.post(
    "https://backendapp.murmurcars.com/api/v1/campaignanalytics/location",
    {
      advertiser: "Easymove",

      geolocation: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      },
    }
  );

  axios
    .get(
      "https://api.ipstack.com/check?access_key=aec1bf893b74676751fa3eb162993f4d"
    )
    .then((response, Pos) => {
      console.log("this is ", Pos);
      axios.post(
        "https://backendapp.murmurcars.com/api/v1/campaignanalytics/location",
        {
          advertiser: "Easymove",
          response: response.data,
          geolocation: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        }
      );
    })
    .catch((error) => console.log("this is error", { error }));
}

//navigator.geolocation.getCurrentPosition((success) => console.log(success));

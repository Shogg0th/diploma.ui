import map from "../../services/map.js";
import config from "../../config.js";

export default {
  created: function () {
    this.get();
  },
  data() {
    return {
      markers: [],



      iconItem: config.markersTemplate.item,
      iconCurrent: config.markersTemplate.current,

      showOnlyWork: false,
      showCurrentLocation: false,
      showNearest: false,
      currentLocation: {
        lat: 0,
        lng: 0
      },

      center: {
        lat: 50.4501,
        lng: 30.5234
      },
      zoom: 10,

      info: {
        marker: {
          lat: 50.4501,
          lng: 30.5234
        },
        show: false
      },
      infoOptions: {
        pixelOffset: {
          width: -1,
          height: -40
        }
      }
    }
  },
  computed: {
    getMarkers() {
      if (this.showNearest) {
        return [map.chooseNearestLocation(this.markers, this.currentLocation)];
      }
      else {
        return this.showOnlyWork ? this.markers.filter(t => t.status) : this.markers;
      }
    }
  },
  methods: {
    like() {
      this.$http.post("like?id=" + this.info.marker._id).then(response => {
        this.info.marker.like += 1;
      });
    },
    dragSelfLocation: function (e) {
      this.currentLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    },
    getCurrentLocation: function () {
      map.getUserLocation().then(response => {
        this.showCurrentLocation = true;
        this.currentLocation = response;
      });
    },
    showWindow: function (marker) {
      this.info.marker = marker;
      this.info.show = true;
    },
    get: function () {
      this.$http.get("pump", {
        responseType: "json"
      }).then(response => {
        this.markers = response.body.map(item => {
          item.statusText = item.status ? "Працює" : "Не працює";
          let numberPattern = /\d+/g,
            number = item.name.match(numberPattern);
          item.documentLink = "http://vodokanal.kiev.ua/buvets/download/" + number;
          return item;
        })
      });
    }
  }
}

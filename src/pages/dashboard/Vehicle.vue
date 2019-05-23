<template>
  <div>
    <q-btn>Show movement on map</q-btn>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: {},
      points: []
    };
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -35.2823468, lng: 149.129934 },
        zoom: 8
      });
    },
    load_data: async function() {
      let response = await this.$api.get("vehicles/location/listroute/");
      this.points = response.data.snappedPoints;
      this.draw_path();
      return true;
    },
    draw_path() {
      let points = this.points.map(member => {
        return {
          lat: member.location.latitude,
          lng: member.location.longitude
        };
      });
      let path = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      path.setMap(this.map);
      this.$q.loading.hide();
    }
  },
  mounted() {
    this.$q.loading.show();
    this.initMap();
    this.load_data();
    window.sss = this;
  }
};
</script>

<style>
#map {
  height: 60vh;
  width: 60vw;
}
</style>

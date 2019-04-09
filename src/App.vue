<template>
  <div id="app">
    <h1>Bysykler i Oslo</h1>
    <div id="mapid" ref="mapElement" style="height: 400px;"></div>
    <CityBikesList></CityBikesList>
  </div>
</template>

<script>
  import CityBikesList from './components/CityBikesList.vue'
  import StationsStore from './stores/StationsStore'
  import yellowbike from './assets/yellow-bike.png';
  import greenbike from './assets/green-bike.png';
  import redbike from './assets/red-bike.png';
  import L from 'leaflet'

  export default {
    name: 'app',
    data() {
      return {
        redbike: redbike,
        greenbike: greenbike,
        yellowbike: yellowbike,
      }
    },
    components: {
      CityBikesList,
    },
    methods: {
      requestStationsData(url) {
        const request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        if (request.status === 200) {
          return JSON.parse(request.responseText).data.stations
        } else {
          return []
        }
      },
      createMap() {
        let map = L.map(this.$refs['mapElement']).setView([59.925488, 10.746058], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        StationsStore.data.map = map;
      },
      addStationToMap(station) {
        let myIcon = L.icon({
          iconUrl: this.getBikeImg(station.num_bikes_available),
          iconSize: [36, 36],
          iconAnchor: [22, 35],
          popupAnchor: [-3, -46],
        });

        L.marker([station.lat, station.lon], {icon: myIcon})
            .addTo(StationsStore.data.map)
            .bindPopup(`<h1>${station.name}</h1>
                <h2>${this.getBikeText(station.num_bikes_available)} og ${this.getLocksText(station.num_docks_available)} ledig</h2>`);
      },
      getBikeImg(availability) {
        if(availability < 1){
          return this.redbike
        } else if (availability < 5) {
          return this.yellowbike
        } else {
          return this.greenbike
        }
      },
      getBikeText(availability) {
        return availability + (availability===1?' sykkel':' sykler')
      },
      getLocksText(availability) {
        return availability + (availability===1?' lås':' låser')
      }
    },
    mounted () {
      this.createMap()

      let stations = this.requestStationsData('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json');
      let availability = this.requestStationsData('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json');

      if (stations.length !== 0 && availability.length !== 0) {
        stations.forEach(station => {
          const stationAvailability = availability.find(availabe => availabe.station_id === station.station_id)
          station.num_docks_available = stationAvailability.num_docks_available
          station.num_bikes_available = stationAvailability.num_bikes_available

          this.addStationToMap(station)
        });
        StationsStore.data.stations = stations.sort((a, b) => a.name.localeCompare(b.name))
      }
    },
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  @import "https://unpkg.com/leaflet@1.2.0/dist/leaflet.css";
  @import "http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  {
    zoomControl: false;
    attributionControl: false;
  }
  body {
    padding: 0;
    margin: 0;
  }
  html, body, #map {
    height: 100%;
    width: 100vw;
  }
</style>

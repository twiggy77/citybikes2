<template>
  <div id="citybikes">
    <div id="stations" >
      <div v-if="StationsStore.stations.length > 0">
        <div v-for="station in StationsStore.stations" v-bind:key="station.station_id">
          <p>
            <b>Id:</b> {{ station.station_id }}<br/>
            <b>Navn:</b> {{ station.name }}<br/>
            <b>Tilgjengelig:</b> {{ station.num_bikes_available }} sykler og {{station.num_docks_available}} låser
          </p>
        </div>
      </div>
      <div v-else>
        Kunne dessverre ikke laste informasjon om stasjonene
      </div>
    </div>
  </div>
</template>

<script>
  import StationsStore from "../stores/StationsStore"

  export default {
    name: "CityBikesList",
    data() {
      return {
        StationsStore: StationsStore.data,
      }
    }
  }
</script>

<style scoped>
</style>
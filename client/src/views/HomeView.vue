<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import FlightSearchBars from "../components/FlightSearchBars.vue";
import FlightsTable from "../components/FlightsTable.vue";
import api from "../api/api";
import { useRoute } from "vue-router";
import type { Flight } from "../models/Flight";
import useGeolocation from "../functions/useGeolocation";

const route = useRoute();

const { location } = useGeolocation();

const flights = ref<Record<string, Flight[]> | null>(null);

const flightOrigins = computed(() => {
  if (!flights.value) return [];
  return Object.keys(flights.value).map(origin => origin).sort((a, b) => a.localeCompare(b))
})

const selectedFlightOrigin = computed(() => {
  const origin = route.query.flightOrigin;
  if (!origin) return null;
  return String(origin);
})

const flightsBySelectedOrigin = computed(() => {
  if (!flights.value || !selectedFlightOrigin.value) return [];
  return flights.value[selectedFlightOrigin.value]
})

const selectedFlightNumber = computed(() => {
  const flightCode = route.query.flightNum;
  if (!flightCode) return null;
  return String(flightCode);
})

const flightSelectedByFlightNumber = computed(() => {
  if (!flights.value || !selectedFlightNumber.value) return null;
  for (const flightsByOrigin of Object.values(flights.value)) {
    for (const flight of flightsByOrigin) {
      if (flight.flightNumber === selectedFlightNumber.value) {
        return flight;
      }
    }
  }

  return "Not found";
})

onMounted(async () => {
  flights.value = await api.getFlights()
})
</script>

<template>
  <main>
    <FlightSearchBars :flight-origins="flightOrigins" />
    <FlightsTable v-if="selectedFlightOrigin && !flightSelectedByFlightNumber"
      :flights-by-origin="flightsBySelectedOrigin" />
    <div id="response" v-if="flightSelectedByFlightNumber">
      {{ flightSelectedByFlightNumber }}
    </div>
    {{ location }}
  </main>
</template>

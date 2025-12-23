<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FlightSearchBars from "../components/FlightSearchBars.vue"
import FlightsTable from "../components/FlightsTable.vue"
import api from "../api/api"
import { useRoute } from "vue-router";

const route = useRoute();

const flights = ref(null)

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

onMounted(async () => {
  flights.value = await api.getFlights()
})
</script>

<template>
  <main>
    <FlightSearchBars :flight-origins="flightOrigins" />
    <FlightsTable v-if="selectedFlightOrigin" :flights-by-origin="flightsBySelectedOrigin" />
  </main>
</template>

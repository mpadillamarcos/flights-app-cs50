<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FlightSearchBars from "../components/FlightSearchBars.vue"
import api from "../api/api"

const flights = ref(null)

const flightOrigins = computed(() => {
  if (!flights.value) return [];
  return Object.keys(flights.value).map(origin => origin).sort((a, b) => a.localeCompare(b))
})

onMounted(async () => {
  flights.value = await api.getFlights()
})
</script>

<template>
  <main>
    <FlightSearchBars :flight-origins="flightOrigins" />
  </main>
</template>

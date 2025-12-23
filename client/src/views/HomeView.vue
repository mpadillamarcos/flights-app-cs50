<script setup lang="ts">
import { onMounted } from 'vue'
import FlightSearchBars from "../components/FlightSearchBars.vue"
import api from "../api/api"

onMounted(async () => {
  const flights = await api.getFlights()
  console.log(flights)
})
</script>

<template>
  <main>
    <FlightSearchBars />
  </main>
</template>

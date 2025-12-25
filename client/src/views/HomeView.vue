<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FlightSearchBars from "../components/FlightSearchBars.vue";
import FlightsTable from "../components/FlightsTable.vue";
import ResponseCard from "../components/ResponseCard.vue";
import api from "../api/api";
import { useRoute } from "vue-router";
import type { Flight } from "../models/Flight";
import useGeolocation from "../functions/useGeolocation";
import type { PickUpRecommendation } from "../models/PickUpRecommendation";

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
});

const selectedFlightNumber = computed(() => {
  const flightCode = route.query.flightNum;
  if (!flightCode) return null;
  return String(flightCode);
});

const isFlightNumberAvailable = computed(() => {
  if (!flights.value || !selectedFlightNumber.value) return false;
  for (const flightsByOrigin of Object.values(flights.value)) {
    for (const flight of flightsByOrigin) {
      if (flight.flightNumber === selectedFlightNumber.value) {
        selectedFlight.value = flight;
        return true;
      }
    }
  }
  return false;
})

const selectedFlight = ref<Flight | null>(null);

const pickUpRecommendation = ref<PickUpRecommendation | null>(null)

watch(selectedFlight, async (newFlight) => {
  if (newFlight && location.value) {
    const arrivalTime = String(newFlight.estimatedArrival);
    pickUpRecommendation.value = await api.getPickUpRecommendation(arrivalTime, location.value);
  }
});

watch(location, async (newLocation) => {
  if (newLocation) {
    flights.value = await api.getFlights()
  }
})
</script>

<template>
  <main>
    <FlightSearchBars :flight-origins="flightOrigins" />
    <FlightsTable v-if="selectedFlightOrigin && !selectedFlight" :flights-by-origin="flightsBySelectedOrigin" />
    <div class="errorMessage" v-if="!location">This service cannot be used unless a location is provided.</div>
    <div class="errorMessage" v-else-if="selectedFlightNumber && !isFlightNumberAvailable">Not found</div>
    <div id="response" v-else-if="selectedFlight && pickUpRecommendation">
      <ResponseCard :flight="selectedFlight" :pick-up="pickUpRecommendation" />
    </div>
  </main>
</template>

<style>
.errorMessage {
  color: rgb(198, 7, 7);
}
</style>
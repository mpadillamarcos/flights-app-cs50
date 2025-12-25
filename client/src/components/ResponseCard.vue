<script setup lang="ts">
import type { Flight } from "../models/Flight";
import type { PickUpRecommendation } from "../models/PickUpRecommendation";
import { formatDate } from "../utils/helpers";

defineProps<{
    flight: Flight,
    pickUp: PickUpRecommendation
}>()

const hasPlaneLanded = (arrivalTime: Date) => {
    return Date.now() > new Date(arrivalTime).getTime();
}
</script>

<template>
    <p>The flight {{ flight.flightNumber }} coming from {{ flight.origin.name }}
        <span v-if="hasPlaneLanded(flight.estimatedArrival)"> has arrived at</span><span v-else> will
            arrive at</span> {{ formatDate(flight.estimatedArrival) }}.
    </p>

    <p v-if="pickUp.leaveAt === 'now'">You should leave <strong>now</strong>, you are already late.</p>
    <p v-else>You should leave from your location starting at
        <strong>{{ formatDate(pickUp.leaveAt) }}</strong>.
    </p>
</template>
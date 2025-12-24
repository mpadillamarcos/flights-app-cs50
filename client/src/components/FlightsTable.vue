<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { PropType } from "vue";
import type { Flight } from "../models/Flight";
import { formatDate } from "../utils/helpers";

const route = useRoute();
const router = useRouter();

defineProps({
    flightsByOrigin: {
        type: Array as PropType<Flight[]>,
        default: () => []
    }
})

const handleFlightSelect = (flightNumber: string) => {
    router.replace({
        query: {
            ...route.query,
            flightNum: flightNumber,
        },
    });
}
</script>

<template>
    <small>Select a flight by clicking on the table</small>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Flight number</th>
                    <th>Origin</th>
                    <th>Scheduled arrival</th>
                    <th>Estimated arrival</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in flightsByOrigin" :id="flight.flightNumber"
                    @click="() => handleFlightSelect(flight.flightNumber)">
                    <td>{{ flight.flightNumber }}</td>
                    <td>{{ flight.origin.name }}</td>
                    <td>{{ formatDate(flight.scheduledArrival) }}</td>
                    <td>{{ formatDate(flight.estimatedArrival) }}</td>
                    <td>{{ flight.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
tr td {
    cursor: pointer;
}
</style>
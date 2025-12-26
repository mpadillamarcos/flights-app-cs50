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
</template>

<style>
th {
    font-weight: 700;
}

table tbody tr {
    cursor: pointer;
}

table tbody tr:nth-child(odd) {
    background-color: #f5f5f5;
}

table tbody tr:hover {
    background-color: #f0d9fd;
}
</style>
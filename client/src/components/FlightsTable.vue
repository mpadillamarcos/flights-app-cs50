<script setup lang="ts">
import enLocale from "../locales/en.json"
import { useRoute, useRouter } from "vue-router";
import type { PropType } from "vue";
import type { Flight } from "../models/Flight";

const route = useRoute();
const router = useRouter();

defineProps({
    flightsByOrigin: {
        type: Array as PropType<Flight[]>,
        default: () => []
    }
})

const formatDate = (isoStringDate: Date) => {
    const date = new Date(isoStringDate);
    const day = date.getDate();
    const monthName = enLocale.months[date.getMonth()]
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${monthName} ${year}, ${hours}:${minutes}`
}

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
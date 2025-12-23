<script setup>
import enLocale from "../locales/en.json"

defineProps({
    flightsByOrigin: {
        type: Array,
        default: () => []
    }
})

const formatDate = (isoStringDate) => {
    const date = new Date(isoStringDate);
    const day = date.getDate();
    const monthNum = date.getMonth();
    const monthStr = enLocale["months"][monthNum]
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${monthStr} ${year}, ${hours}:${minutes}`
}
</script>

<template>
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
                <tr v-for="flight in flightsByOrigin" :id="flight.flightNumber">
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
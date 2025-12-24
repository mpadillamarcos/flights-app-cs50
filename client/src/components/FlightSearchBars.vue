<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import SearchIcon from "../components/icons/SearchIcon.vue"

defineProps({
    flightOrigins: {
        type: Array<string>,
        default: () => []
    }
})

const route = useRoute();
const router = useRouter();

const selectedSearchOption = ref("flightNumber");
const flightNumber = ref("");
const flightOrigin = ref("");

const handleSearchByFlightNumber = () => {
    router.replace({
        query: {
            ...route.query,
            flightNum: flightNumber.value,
        },
    });
}

const handleSearchByFlightOrigin = () => {
    router.replace({
        query: {
            searchOption: selectedSearchOption.value,
            flightOrigin: flightOrigin.value,
        },
    });
}

watch(selectedSearchOption, (newSelectedOption) => {
    const newQuery: Record<string, string> = { searchOption: newSelectedOption };

    if (newSelectedOption === "flightNumber" && flightNumber.value) {
        newQuery.flightNum = flightNumber.value
    } else if (newSelectedOption === "flightOrigin" && flightOrigin.value) {
        newQuery.flightOrigin = flightOrigin.value
    }

    router.replace({ query: newQuery })

    if (newSelectedOption === "flightNumber") {
        flightOrigin.value = ""
    } else {
        flightNumber.value = ""
    }
});

onMounted(() => {
    if (route.query.searchOption) {
        selectedSearchOption.value = String(route.query.searchOption)
    }
    if (route.query.flightNum) {
        flightNumber.value = String(route.query.flightNum)
    }
    if (route.query.flightOrigin) {
        flightOrigin.value = String(route.query.flightOrigin)
    }
})
</script>

<template>
    <div>
        <div id="toggle">
            <button class="button" :class="{ 'button-outline': selectedSearchOption != 'flightNumber' }"
                @click="selectedSearchOption = 'flightNumber'">Flight number</button>
            <button class="button" :class="{ 'button-outline': selectedSearchOption != 'flightOrigin' }"
                @click="selectedSearchOption = 'flightOrigin'">Flight origin</button>
        </div>
        <div v-if="selectedSearchOption === 'flightNumber'" id="searchBar">
            <div class="row">
                <input v-model="flightNumber" placeholder="Enter flight number. Eg: ABC1234" />
                <button class="search button" @click="handleSearchByFlightNumber">
                    <SearchIcon />
                </button>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <select v-model="flightOrigin">
                    <option v-for="origin in flightOrigins" :id="origin">{{ origin }}</option>
                </select>
                <button class="search button" @click="handleSearchByFlightOrigin">
                    <SearchIcon />
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.button:focus {
    background-color: #9b4dca;
    border-color: #9b4dca;
}

.search {
    display: flex;
    align-items: center;
}

.search:hover {
    background-color: #606C76;
}
</style>
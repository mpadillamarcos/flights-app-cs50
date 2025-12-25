<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchIcon from "../components/icons/SearchIcon.vue";
import useGeolocation from "../functions/useGeolocation";

defineProps({
    flightOrigins: {
        type: Array<string>,
        default: () => []
    }
})

const route = useRoute();
const router = useRouter();

const { location } = useGeolocation();

const selectedSearchOption = ref("flightNumber");
const flightNumber = ref("");
const flightOrigin = ref("");

const handleSearchByFlightNumber = () => {
    router.replace({
        query: {
            ...route.query,
            flightNum: flightNumber.value.trim(),
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
        newQuery.flightNum = flightNumber.value;
    } else if (newSelectedOption === "flightOrigin" && flightOrigin.value) {
        newQuery.flightOrigin = flightOrigin.value;
        if (flightNumber.value) {
            newQuery.flightNum = flightNumber.value;
        }
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
    <div id="searchBox" class="container">
        <div id="toggle">
            <button class="button left" :class="{ 'button-outline': selectedSearchOption != 'flightNumber' }"
                :disabled="!location" @click="selectedSearchOption = 'flightNumber'">Flight number</button>
            <button class="button right" :class="{ 'button-outline': selectedSearchOption != 'flightOrigin' }"
                :disabled="!location" @click="selectedSearchOption = 'flightOrigin'">Flight origin</button>
        </div>
        <div v-if="selectedSearchOption === 'flightNumber'" id="searchBar" class="searchBar">
            <input v-model="flightNumber" placeholder="Enter flight number. Eg: ABC1234" :disabled="!location"
                class="bar" />
            <button class="search button" @click="handleSearchByFlightNumber" :disabled="!location">
                <SearchIcon />
            </button>
        </div>
        <div v-else class="searchBar">
            <select v-model="flightOrigin" :disabled="!location" id="selector" class="bar">
                <option v-for="origin in flightOrigins" :id="origin">{{ origin }}</option>
            </select>
            <button class="search button" @click="handleSearchByFlightOrigin" :disabled="!location">
                <SearchIcon />
            </button>
        </div>
    </div>
</template>

<style>
#searchBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#toggle {
    display: flex;
    align-items: center;
}

#toggle .left {
    border-radius: 4px 0px 0px 4px;
}

#toggle .right {
    border-radius: 0px 4px 4px 0px;
}

.searchBar {
    display: flex;
}

.searchBar .bar {
    width: 40rem;
    max-width: 40rem;
    flex-shrink: 0;
    border-radius: 4px 0px 0px 4px;
}

.searchBar .search.button {
    width: 4rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 4px 4px 0px;
}

.button:focus {
    background-color: #9b4dca;
    border-color: #9b4dca;
}

.search:hover {
    background-color: #606C76;
}

/* Mobile only */
@media (max-width: 600px) {
    #toggle {
        display: flex;
        width: 100%;
    }

    #toggle .button {
        flex: 1;
        width: 50%;
        margin-bottom: 10px;
    }

    .searchBar .search.button {
        width: 6rem;
    }
}
</style>
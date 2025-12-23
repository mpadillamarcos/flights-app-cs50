<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router";
import SearchIcon from "../components/icons/SearchIcon.vue"

const route = useRoute();
const router = useRouter();

const selectedSearchOption = ref("flightNumber");
const flightNumber = ref(null);

const handleSearchByFlightNumber = () => {
    router.replace({
        query: {
            ...route.query,
            flightNum: flightNumber.value,
        },
    });
}

watch(selectedSearchOption, (newSelectedOption) => {
    router.replace({
        query: {
            searchOption: newSelectedOption,
        },
    });
});
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
                <input v-model="flightNumber" placeholder="Enter flight number" />
                <button class="search button" @click="handleSearchByFlightNumber">
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
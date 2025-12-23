<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const selectedSearchOption = ref("flightNumber");

watch(selectedSearchOption, (newSelectedOption) => {
    router.replace({
        query: {
            ...route.query,
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
    </div>
</template>

<style>
.button:focus {
    background-color: #9b4dca;
    border-color: #9b4dca;
}
</style>
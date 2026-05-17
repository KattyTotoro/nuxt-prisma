<template>


</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/costbyperiod')
const addCostbyperiodObj = ref({
  periodmonth:0,
  periodyear:0,
  electricity:0,
  water:0,
  gas:0,
  sewerage:0,
  sharedelectricity:0,
})
const addText = ref('')


</script>
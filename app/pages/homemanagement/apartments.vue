<template>
  <div v-for="apartment of data" :key="apartment.id">
    <form style="display: flex;margin: 10px 0; gap:10px" @submit.prevent="updateApartment(apartment, $event)">
      <p style="margin: 0;">kv № {{ apartment.apartment }}</p>
      <input type="text" placeholder="fio" v-model="apartment.fio" />
      <p style="margin: 0;">area {{ apartment.area }}</p>
      <button>save</button>
    </form>
  </div>
  <h1>Apartment Add</h1>
  <form @submit.prevent="addApartment">
    <input type="text" placeholder="apartment" v-model="addApartmentObj.apartment" />
    <input type="text" placeholder="fio" v-model="addApartmentObj.fio" />
    <input type="text" placeholder="area" v-model="addApartmentObj.area" />
    <button>add</button>
    <p v-if="addText">{{ addText }}</p>
  </form>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/apartments')
const addApartmentObj = ref({
  apartment:'',
  fio:'',
  area:0,
  persent:0,
})
const addText = ref('')

const updateApartment = async (el:any, event:Event) => {
  const result = await $fetch('/api/apartments', {
    method: 'PUT',
    body: el
  })
  if (result?.id) {
    const target = event.target as HTMLElement
    target.style.backgroundColor='green'
    setTimeout(()=>{target.style.backgroundColor=''},1000)
  }
}

const addApartment = async () => {
  addText.value = ''
  if (!addApartmentObj.value.apartment) {
    addText.value = 'input apartment'
    return
  }
  if (!addApartmentObj.value.fio) {
    addText.value = 'input fio'
    return
  }
  if (!addApartmentObj.value.area) {
    addText.value = 'input area'
    return
  }
  addApartmentObj.value.area = parseFloat(addApartmentObj.value.area.toString())
  const result = await $fetch('/api/apartments', {
    method: 'POST',
    body: addApartmentObj.value
  })
  if (result?.id) {
    addApartmentObj.value = { 
      apartment:'',
      fio:'',
      area:0,
      persent:0, 
    }
    refresh()
  } else {
    addText.value = 'something went wrong'
  }
}
</script>
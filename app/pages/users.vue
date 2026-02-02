<template>
  <h1>Users</h1>
  <div v-for="user of data" :key="user.id">
    {{ user }}
  </div>
  <h1>User Add</h1>
  <form @submit.prevent="addUser">
    <input type="text" placeholder="name" v-model="addUserObj.name" />
    <input type="text" placeholder="email" v-model="addUserObj.email" />
    <button>add</button>
    <p v-if="addText">{{ addText }}</p>
  </form>
  <h1>User Edit</h1>
  <form @submit.prevent="editUser">
    <input type="text" placeholder="email" v-model="editUserObj.email" />
    <input type="text" placeholder="name" v-model="editUserObj.name" />
    <button>set</button>
    <p v-if="editText">{{ editText }}</p>
  </form>
  <h1>User Delete</h1>
  <form @submit.prevent="deleteUser">
    <input type="text" placeholder="id" v-model="deleteId" />
    <button>delete</button>
    <p v-if="deleteText">{{ deleteText }}</p>
  </form>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/users')
const addUserObj = ref({name:'', email:''})
const editUserObj = ref({ name: '', email: '' })
const addText = ref('')
const editText = ref('')
const deleteText = ref('')
const deleteId = ref('')
const addUser = async () => {
  addText.value = ''
  if (!addUserObj.value.email) {
    addText.value = 'input email'
    return
  }
  const result = await $fetch('/api/users', {
    method: 'POST',
    body: addUserObj.value
  })
  if (result?.id) {
    addUserObj.value = { name: '', email: '' }
    refresh()
  } else {
    addText.value = 'email already exist'
  }
}
const editUser = async () => {
  editText.value = ''
  if (!editUserObj.value.email) {
    editText.value = 'input email'
    return
  }
  const result = await $fetch('/api/users/', {
    method: 'PUT',
    body: editUserObj.value
  })
  if (result) {
    editUserObj.value = { name: '', email: '' }
    refresh()
  } else {
    editText.value = 'email not exist'
  }
}
const deleteUser = async () => {
  deleteText.value=''
  if (!deleteId.value) {
    deleteText.value = 'input id'
    return
  }
  const result = await $fetch(`/api/users/${deleteId.value}`, {
    method: 'delete'
  })
  if (result) {
    deleteId.value = ''
    deleteText.value = `user ${Object.values(result)} deted`
    refresh()
  } else {
    deleteText.value = 'user not exist'
  }
}

</script>
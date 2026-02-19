<template>
  <h1>Groups</h1>
  <div v-for="group of data" :key="group.id">
    {{ group }}
  </div>
  <h1>Group Add</h1>
  <form @submit.prevent="addGroup">
    <input type="text" placeholder="name" v-model="addGroupName" />
    <button>add</button>
    <p v-if="addText">{{ addText }}</p>
  </form>
  <h1>Group Edit</h1>
  <form @submit.prevent="editGroup">
    <input type="text" placeholder="id" v-model="editGroupObj.id" />
    <input type="text" placeholder="name" v-model="editGroupObj.name" />
    <button>set</button>
    <p v-if="editText">{{ editText }}</p>
  </form>
  <h1>Category Delete</h1>
  <form @submit.prevent="deleteGroup">
    <input type="text" placeholder="id" v-model="deleteId" />
    <button>delete</button>
    <p v-if="deleteText">{{ deleteText }}</p>
  </form>
  <h1>Add user to Group</h1>
  <form @submit.prevent="addUser">
    <input type="text" placeholder="group id" v-model="addId" />
    <input type="text" placeholder="user id" v-model="addUserId" />
    <button>add user</button>
    <p v-if="addUserText">{{ addUserText }}</p>
  </form>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/groups')
const addId = ref('')
const addUserId = ref('')
const addUserText = ref('')
const addGroupName = ref('')
const editGroupObj = ref({ name: '', id: '' })
const addText = ref('')
const editText = ref('')
const deleteText = ref('')
const deleteId = ref('')
const addGroup = async () => {
  addText.value = ''
  if (!addGroupName.value) {
    addText.value = 'input Group'
    return
  }
  const result = await $fetch('/api/groups', {
    method: 'POST',
    body: {name: addGroupName.value}
  })
  if (result?.id) {
    addGroupName.value = ''
    refresh()
  } else {
    addText.value = 'Group already exist'
  }
}
const editGroup = async () => {
  editText.value = ''
  if (!editGroupObj.value.id) {
    editText.value = 'input id'
    return
  }
  const result = await $fetch('/api/groups', {
    method: 'PUT',
    body: editGroupObj.value
  })
  if (result) {
    editGroupObj.value = { name: '', id: '' }
    refresh()
  } else {
    editText.value = 'Group not exist'
  }
}
const deleteGroup = async () => {
  deleteText.value=''
  if (!deleteId.value) {
    deleteText.value = 'input id'
    return
  }
  const result = await $fetch(`/api/groups/${deleteId.value}`, {
    method: 'delete'
  })
  if (result) {
    deleteId.value = ''
    deleteText.value = `group ${Object.values(result)} deleted`
    refresh()
  } else {
    deleteText.value = 'Group not exist'
  }
}
const addUser = async () => {
  addUserText.value = ''
  if (!addId.value || !addUserId.value) {
    addUserText.value = 'Укажите все данные'
    return
  }
  const result = await $fetch('/api/groups/add_user', {method:'post', body:{id:addId.value, user_id:addUserId.value}})
  if (result) {
    addUserText.value = `user ${addUserId.value} added to group ${result.name}`
    refresh()
  } else {
    addUserText.value = 'Group or user not exist'
  }
}

</script>
<template>
  <h1>Categories</h1>
  <div v-for="category of data" :key="category.id">
    {{ category }}
  </div>
  <h1>Category Add</h1>
  <form @submit.prevent="addCategory">
    <input type="text" placeholder="name" v-model="addCategoryName" />
    <button>add</button>
    <p v-if="addText">{{ addText }}</p>
  </form>
  <h1>Category Edit</h1>
  <form @submit.prevent="editCategory">
    <input type="text" placeholder="id" v-model="editCategoryObj.id" />
    <input type="text" placeholder="name" v-model="editCategoryObj.name" />
    <button>set</button>
    <p v-if="editText">{{ editText }}</p>
  </form>
  <h1>Category Delete</h1>
  <form @submit.prevent="deleteCategory">
    <input type="text" placeholder="id" v-model="deleteId" />
    <button>delete</button>
    <p v-if="deleteText">{{ deleteText }}</p>
  </form>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/categories')
const addCategoryName = ref('')
const editCategoryObj = ref({ name: '', id: '' })
const addText = ref('')
const editText = ref('')
const deleteText = ref('')
const deleteId = ref('')
const addCategory = async () => {
  addText.value = ''
  if (!addCategoryName.value) {
    addText.value = 'input Category'
    return
  }
  const result = await $fetch('/api/categories', {
    method: 'POST',
    body: {name: addCategoryName.value}
  })
  if (result?.id) {
    addCategoryName.value = ''
    refresh()
  } else {
    addText.value = 'Category already exist'
  }
}
const editCategory = async () => {
  editText.value = ''
  if (!editCategoryObj.value.id) {
    editText.value = 'input id'
    return
  }
  const result = await $fetch('/api/categories', {
    method: 'PUT',
    body: editCategoryObj.value
  })
  if (result) {
    editCategoryObj.value = { name: '', id: '' }
    refresh()
  } else {
    editText.value = 'Category not exist'
  }
}
const deleteCategory = async () => {
  deleteText.value=''
  if (!deleteId.value) {
    deleteText.value = 'input id'
    return
  }
  const result = await $fetch(`/api/categories/${deleteId.value}`, {
    method: 'delete'
  })
  if (result) {
    deleteId.value = ''
    deleteText.value = `category ${Object.values(result)} deleted`
    refresh()
  } else {
    deleteText.value = 'Category not exist'
  }
}

</script>
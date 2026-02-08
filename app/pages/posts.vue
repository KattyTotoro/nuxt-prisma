<template>
  <h1>Posts</h1>
  <div v-for="post of data" :key="post.id">
    {{ post }}
    <p>
      <img v-for="image of post.data.images" :key="image.img" height="100px" :src="image.img" :alt="image.alt">
    </p>
  </div>
  <h1>Post Add</h1>
  <form @submit.prevent="addPost">
    <input type="text" placeholder="name" v-model="addPostObj.title" />
    <textarea placeholder="content" v-model="addPostObj.content"></textarea>
    <p>images</p>
    <div v-for="image of addPostObj.data.images" :key="image.img">
      <input type="text" placeholder="image" v-model="image.img" />
      <input type="text" placeholder="alt" v-model="image.alt" />
      <input type="text" placeholder="photographer" v-model="image.photographer" />
    </div>
    <div style="padding:10px; border: 1px black solid; border-radius: 2px;" @click="addPicPostAdd">+</div>
    <label><input type="checkbox" v-model="addPostObj.published" /> published</label>
    <input type="text" placeholder="author id" v-model="addPostObj.authorId" />
    <button>add</button>
    <p v-if="addText">{{ addText }}</p>
  </form>
  <h1>Post Edit</h1>
  <form v-if="!editPostObj" @submit.prevent="beforeEditPost">
    <input type="text" placeholder="id" v-model="editPostId" />
    <button>get</button>
    <p v-if="editText">{{ editText }}</p>
  </form>
  <form v-else @submit.prevent="editPost">
    <input type="text" placeholder="name" v-model="editPostObj.title" />
    <textarea placeholder="content" v-model="editPostObj.content"></textarea>
    <p>images</p>
    <div v-for="image of editPostObj.data.images" :key="image.img">
      <input type="text" placeholder="image" v-model="image.img" />
      <input type="text" placeholder="alt" v-model="image.alt" />
      <input type="text" placeholder="photographer" v-model="image.photographer" />
    </div>
    <div style="padding:10px; border: 1px black solid; border-radius: 2px;" @click="addPicPostEdit">+</div>
    <label><input type="checkbox" v-model="editPostObj.published" /> published</label>
    <button>set</button>
    <p v-if="editText">{{ editText }}</p>
  </form>
  <h1>Post Delete</h1>
  <form @submit.prevent="deletePost">
    <input type="text" placeholder="id" v-model="deleteId" />
    <button>delete</button>
    <p v-if="deleteText">{{ deleteText }}</p>
  </form>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch<any[]>('/api/posts')
const addPostObj = ref({ title: '', content: '', data: { images: [{img:'', alt:''}] as any[] } , published: false, authorId: '' })
const editPostId = ref('')
const editPostObj = ref(null as null|any)
const addText = ref('')
const editText = ref('')
const deleteText = ref('')
const deleteId = ref('')
const addPicPostAdd = () => {
  addPostObj.value.data.images.push({ img: '', alt: '' })
}
const addPicPostEdit = () => {
  editPostObj.value.data.images.push({ img: '', alt: '' })
}
const addPost = async () => {
  addText.value = ''
  if (!addPostObj.value.title) {
    addText.value = 'input title'
    return
  }
  if (!addPostObj.value.authorId) {
    addText.value = 'input author id'
    return
  }
  const result = await $fetch('/api/posts', {
    method: 'POST',
    body: addPostObj.value
  })
  if (result?.id) {
    addPostObj.value = { title: '', content: '', data: { images: [{}] as any[] }, published: false, authorId: '' }
    refresh()
  } else {
    addText.value = 'something gows wrong'
  }
}
const beforeEditPost = async () => {
  const tempPost:any = await $fetch('/api/posts/' + editPostId.value)
  if (tempPost?.id) {
    editPostObj.value = tempPost
    editText.value = ''
  } else {
    editText.value = 'post not exist'
  }
}
const editPost = async () => {
  if (!editPostObj.value.id) {
    editText.value = 'input id'
    return
  }
  const result = await $fetch('/api/posts/', {
    method: 'PUT',
    body: editPostObj.value
  })
  if (result) {
    editPostObj.value = null
    editPostId.value = ''
    refresh()
  } else {
    editText.value = 'post not exist'
  }
}
const deletePost = async () => {
  deleteText.value=''
  if (!deleteId.value) {
    deleteText.value = 'input id'
    return
  }
  const result = await $fetch(`/api/posts/${deleteId.value}`, {
    method: 'delete'
  })
  if (result) {
    deleteId.value = ''
    deleteText.value = `post ${Object.values(result)} deted`
    refresh()
  } else {
    deleteText.value = 'post not exist'
  }
}

</script>
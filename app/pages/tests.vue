<template>
  <h1>Hello</h1>
  <div style="font-size: 18px;">
  <h2>tests</h2>
  <p>/api/tests <b>{{ testsIndexGet }}</b></p>
  <p>/api/tests/1  <b>{{ testsIndexId }}</b></p>
  <p>/api/tests | get <b>{{ testsGet }}</b></p>
  <p>/api/tests | delete <b>{{ testsDelete }}</b></p>
  <p>/api/tests | post <b>{{ testsPost }}</b></p>
  <p>/api/tests | put <b>{{ testsPut }}</b></p>
  <p>/api/tests/local | get <b>{{ testsLocal }}</b></p>

  <h2>tests/groupe</h2>
  <p>/api/tests/goupe/1 <b>{{ testGoupeId }}</b></p>
  <p>/api/tests/goupe <b>{{ testGoupe }}</b></p>
  <p>/api/tests/goupe | post <b>{{ testGoupePost }}</b></p>
  <p>/api/tests/goupe | delete <b>{{ testGoupeDelete }}</b></p>
  <p>/api/tests/goupe | put <b>{{ testGoupePut }}</b></p>
  <p>/api/tests/goupe/local | get <b>{{ testGoupeLocal }}</b></p>
  </div>
</template>

<script setup lang="ts">
const testsIndexGet = await $fetch('/api/tests')
const testsGet = await $fetch('/api/tests', {method: 'get'})
const testsDelete = await $fetch('/api/tests', {method: 'delete'})
const testsPost = await $fetch('/api/tests', {method: 'post', body:{a:'sdfsd',jslkdfj:4545}})
const testsPut = await $fetch('/api/tests', {method: 'put'})
const testsIndexId = await $fetch('/api/tests/1skdgfhdsfgj-jhdsakjdsa')
const testsLocal = await $fetch('/api/tests/local', {method: 'get'})

const testGoupe = await $fetch('/api/tests/goupe')
const fD = new FormData()
fD.append('sdfds','sdfdsf')
const testGoupePost = await $fetch('/api/tests/goupe', {method: 'post', body: fD})
const testGoupeId = await $fetch('/api/tests/goupe/1group_id')
const testGoupeDelete = await $fetch('/api/tests/goupe', {method: 'delete'})
const testGoupePut = await $fetch('/api/tests/goupe', {method: 'put'})
const testGoupeLocal = await $fetch('/api/tests/goupe/local', {method: 'get'})

</script>
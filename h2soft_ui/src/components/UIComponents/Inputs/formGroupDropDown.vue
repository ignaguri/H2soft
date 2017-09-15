<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <select id="rol" v-model="user.idRol" required>
      <option value="">Seleccione</option>
      <option v-for="rol in data" v-bind:value="rol.idRoles">
        {{ rol.nombre }}
      </option>
    </select>

  </div>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: String,
      name: String,
      disabled: Boolean,
      required: Boolean,
      placeholder: String,
      value: [String, Number],
      data: ['1', '2']
    }
  }

</script>
<style>

</style>

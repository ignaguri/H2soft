<template>
  <div>
    <div class="row">
      <new-user-form v-if="!this.isUserList" v-bind:id="1"></new-user-form>
      <users-list v-if="this.isUserList"></users-list>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addUser" v-show="isUserList">
            Agregar Usuario
          </button>
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addUser" v-show="isUserList">
            Editar Usuario 1
          </button>
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeList" v-show="!isUserList">
            Cancelar
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import UsersList from './Usuarios/UsersList.vue'
  import NewUserForm from './Usuarios/NewUserForm.vue'
  export default {
    components: {
      UsersList,
      NewUserForm
    },
    data () {
      return {
        // current: 'UsersList',
        isUserList: true
      }
    },
    methods: {
      addUser () {
        this.isUserList = false
        // this.current = 'NewUserForm'
      },
      seeList () {
        // this.current = 'UsersList'
        this.isUserList = true
      }
    }
  }

</script>
<style>

</style>

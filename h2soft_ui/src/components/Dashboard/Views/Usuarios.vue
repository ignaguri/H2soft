<template>
  <div>
    <div class="row">
      <new-user-form v-if="!this.isUserList" v-bind:id="userId"></new-user-form>
      <users-list v-if="this.isUserList"></users-list>
    </div>
    <div class="row">
      <div class="col-md-11">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addUser" v-show="isUserList">
            Agregar Usuario
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
        isUserList: true,
        userId: 0
      }
    },
    methods: {
      addUser () {
        this.isUserList = false
      },
      seeList () {
        this.isUserList = true
        this.userId = 0
      }
    }
  }

</script>
<style>

</style>

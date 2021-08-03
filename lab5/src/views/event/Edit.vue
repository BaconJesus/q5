<template>
<div>
  <p>Edit the user data here</p>
  <button @click="editinfo"> Edit </button>
  </div>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    editinfo() {
      this.GStore.flashMessage =
        'You are seccessfully edited info of ' + this.event.name
      setTimeout(() => {
        //After 5 seconds remove it
        this.GStore.flashMessage = ''
      }, 5000)
      //Set a flash message to appear on the next page loaded which says
      this.$router.push({
        name: 'Home',
        params: { id: this.event.id }
      })
    }
  }
}
</script>

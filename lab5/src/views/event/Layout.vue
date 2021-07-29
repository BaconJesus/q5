<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }">
        Details</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }">
        Edit</router-link
      >
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import PassengerService from '@/services/PassengerService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    PassengerService.getPassenger(this.id)
      .then((response) => {
        this.event = response.data
        if (response && response.status == 204) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' }
          })
        }
      })
      .catch(() => {})
  }
}
</script>

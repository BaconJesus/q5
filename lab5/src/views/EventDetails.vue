<template>
  <div v-if="event">
    <h1>{{ event.name }}</h1>
    <img :src="event.airline.logo">
    <h3>Slogan: {{ event.airline.slogan}}</h3>
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
    //fetch by id
    PassengerService.getPassenger(this.id)
      .then((response) => {
        this.event = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

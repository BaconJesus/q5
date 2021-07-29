<template>
  <div v-if="event">
    <h1>{{ event.name }}</h1>
    <span v-if="checkid">
      <h2>Airline name: {{ event.airline.name }}</h2>
      <img :src="event.airline.logo" />
      <h3>{{ event.airline.country }}</h3>
      <p>{{ event.airline.head_quaters }}</p>
      <p>{{ event.airline.website }}</p>
      <p>established : {{ event.airline.established }}</p>
    </span>
    <div v-if="checkid == false">
      <span v-for="airline in event.airline" :key="airline.id">
        <h2>Airline name: {{ airline.name }}</h2>
        <img :src="airline.logo" />
        <h3>{{ airline.country }}</h3>
        <p>{{ airline.head_quaters }}</p>
        <p>{{ airline.website }}</p>
        <p>established : {{ airline.established }}</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],
  computed: {
    checkid: function () {
      var id = this.event._id
      if (id == '5f1c59d0fa523c3aa793c0ac') {
        return true
      } else return false
    }
  }
}
</script>
<style scoped>
img {
  height: 50px;
}
</style>

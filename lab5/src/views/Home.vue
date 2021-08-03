<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event._id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import PassengerService from '@/services/PassengerService.js'
export default {
  //name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    },
  },

  components: {
    EventCard // register it as a child component
  },
  data() {
    return {
      events: null,
      totalEvents: 0 //added this to store totalEvents
    }
  },
 // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PassengerService.getEvents(parseInt(routeTo.query.perPage) || 10, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data.data
          comp.totalEvents = response.headers['x-total-count']
        })
        })
      .catch(() => {
        next({ name: 'NetworkError' })
    
    })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    PassengerService.getEventsparseInt((routeTo.query.perPage) || 10, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.events = response.data.data
        this.totalEvents = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  }
}

</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: right;
}

#page-next {
  text-align: right;
}
</style>

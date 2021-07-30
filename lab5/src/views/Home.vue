<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event._id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import PassengerService from '@/services/PassengerService.js'
import { watchEffect } from '@vue/runtime-core'
// import axios from 'axios'
export default {
  //name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
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
  created() {
    watchEffect(() => {
      PassengerService.getEvents(this.perPage , this.page)
        .then((response) => {
          this.events = response.data.data
          this.totalEvents = response.headers['x-total-count'] // <-- Store it
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },

  // computed: {
  //   hasNextPage() {
  //     //frist, calculate total pages
  //     let totalPages = Math.ceil(this.totalEvents / this.size) //2 is event per page
  //     //then check to see if the current page is less than th etotal page
  //     return this.page < totalPages
  //   }
  // }
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

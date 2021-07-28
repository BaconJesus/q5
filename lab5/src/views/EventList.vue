<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
    <router-link :to="{ name: 'EventList', query: { size: size + 1 } }">
      +
    </router-link>
    <router-link :to="{ name: 'EventList', query: { size: size - 1 } }">
      -
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from '@vue/runtime-core'
// import axios from 'axios'
export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    },
    size: {
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
      EventService.getEvents(this.size, this.page)
        .then((response) => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count'] // <-- Store it
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },

  computed: {
    hasNextPage() {
      //frist, calculate total pages
      let totalPages = Math.ceil(this.totalEvents / this.size) //2 is event per page
      //then check to see if the current page is less than th etotal page
      return this.page < totalPages
    }
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

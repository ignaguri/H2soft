<template>
  <div class="row">
    <div class="col-md-12">
        <div class="calendar-parent">
          <calendar-view
            :events="events"
            :show-date="showDate"
            :time-format-options="{hour: 'numeric', minute:'2-digit'}"
            :enable-drag-drop="false"
            :disable-past="disablePast"
            :disable-future="disableFuture"
            :show-event-times="showEventTimes"
            :display-period-uom="displayPeriodUom"
            :display-period-count="displayPeriodCount"
            :starting-day-of-week="startingDayOfWeek"
            :class="themeClasses"
            @click-date="onClickDay"
            @click-event="onClickEvent"
            @show-date-change="setShowDate"
          >
            <!--<span slot="event" slot-scope="props"-->
                 <!--:class="props.event.classes"-->
                 <!--:key="props.event.id"-->
                 <!--v-html="props.event.title"/>-->
          </calendar-view>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="volver">
            Volver
          </button>
        </div>
      </div>
  </div>
</template>
<script>
  import api from 'src/api/services/recorridoServices'
  import CalendarView from 'vue-simple-calendar'
  import CalendarMathMixin from 'vue-simple-calendar/dist/calendar-math-mixin.js'
  require('vue-simple-calendar/dist/static/css/default.css')
  export default {
    components: {
      CalendarView
    },
    mixins: [CalendarMathMixin],
    data () {
      return {
        /* Show the current month, and give it some fake events to show */
        showDate: this.thisMonth(1),
        message: '',
        startingDayOfWeek: 0,
        disablePast: false,
        disableFuture: false,
        displayPeriodUom: 'month',
        displayPeriodCount: 1,
        showEventTimes: false,
        useDefaultTheme: true,
        events: [
          {
            id: 'e0',
            startDate: '2018-01-05'
          },
          {
            id: 'e1',
            startDate: this.thisMonth(15, 18, 30)
          },
          {
            id: 'e2',
            startDate: this.thisMonth(15),
            title: 'Single-day event with a long title'
          },
          {
            id: 'e3',
            startDate: this.thisMonth(7, 9, 25),
            endDate: this.thisMonth(10, 16, 30),
            title: 'Multi-day event with a long title and times'
          },
          {
            id: 'e4',
            startDate: this.thisMonth(20),
            title: 'My Birthday!',
            classes: 'birthday',
            url: 'https://en.wikipedia.org/wiki/Birthday'
          },
          {
            id: 'e5',
            startDate: this.thisMonth(5),
            endDate: this.thisMonth(12),
            title: 'Multi-day event',
            classes: 'purple'
          },
          {
            id: 'foo',
            startDate: this.thisMonth(29),
            title: 'Same day 1'
          },
          {
            id: 'e6',
            startDate: this.thisMonth(29),
            title: 'Same day 2',
            classes: 'orange'
          },
          {
            id: 'gura',
            startDate: this.thisMonth(17),
            title: 'Recorrido 74',
            classes: 'tomato'
          }
        ]
      }
    },
    computed: {
      userLocale () {
        return this.getDefaultBrowserLocale
      },
      dayNames () {
        return this.getFormattedWeekdayNames(this.userLocale, 'long', 0)
      },
      themeClasses () {
        return {
          'theme-default': this.useDefaultTheme
        }
      }
    },
    watch: {
      message: function () {
        console.log(this.message)
      }
    },
    mounted () {
      this.cargarEventos()
    },
    methods: {
      cargarEventos () {
        api.getRecorridosHistoricosPorMes(this, new Date().getMonth())
          .then(r => {
            this.events = []
            const eventos = r.map(recorrido => ({
              startDate: new Date(recorrido.fechaAsignacion),
              title: `Recorrido ${recorrido.idRecorrido}`
            }))
            this.events = eventos
          })
      },
      thisMonth (d, h, m) {
        const t = new Date()
        return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
      },
      onClickDay (d) {
        this.message = `You clicked: ${d.toLocaleDateString()}`
      },
      onClickEvent (e) {
        this.message = `You clicked: ${e.title}`
      },
      setShowDate (d) {
        this.message = `Changing calendar view to ${d.toLocaleDateString()}`
        this.showDate = d
      },
      volver () {
        this.$parent.show = 'list'
      }
    }
  }

</script>
<style>
  .calendar-parent {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: hidden;
    max-height: 70vh;
    height: 400px;
    background-color: white;
  }
  /* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
  .cv-wrapper.period-month.periodCount-2 .cv-week,
  .cv-wrapper.period-month.periodCount-3 .cv-week,
  .cv-wrapper.period-year .cv-week {
    min-height: 6rem;
  }
  /* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
  /* Add some styling for events tagged with the "birthday" class */
  .calendar .event.birthday {
    background-color: #e0f0e0;
    border-color: #d7e7d7;
  }
  .calendar .event.birthday::before {
    content: "\1F382";
    margin-right: 0.5em;
  }
  .theme-default .cv-header {
    align-self: center;
  }
  .theme-default .cv-event.tomato {
    background-color: #ff6357;
    border-color: #ff6360;
  }
</style>

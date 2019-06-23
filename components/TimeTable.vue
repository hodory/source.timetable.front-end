<template>
  <no-ssr>
    <tui-calendar style="height: 800px;"
                  :schedules="scheduleList"
                  :view="view"
                  :taskView="taskView"
                  :scheduleView="scheduleView"
                  :theme="theme"
                  :week="week"
                  :month="month"
                  :template="template"
                  :disableDblClick="disableDblClick"
                  :isReadOnly="isReadOnly"
    />
  </no-ssr>
</template>

<script>
  import 'tui-calendar/dist/tui-calendar.css'
  import moment from "moment";
  import _ from "lodash";

  export default {
    name: "TimeTable",
    props: [
      'cases'
    ],
    data() {
      return {
        view: 'week',
        taskView: false,
        scheduleView: ['time'],
        theme: {},
        template: {
          weekDayname: function (model) {
            return '<span class="tui-full-calendar-dayname-date">' + model.dayName + '</span>';
          },
        },
        week: {
          narrowWeekend: true,
          workweek: true,
          hourStart: 8,
          hourEnd: 19,
          daynames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
        },
        month: {
          visibleWeeksCount: 6,
          startDayOfWeek: 1
        },
        disableDblClick: true,
        isReadOnly: true,
      }
    },
    computed: {
      scheduleList() {
        let arr = [];
        let index = 0;
        _.map(this.cases, (_case) => {
          const bgColor = this.getRandomHexColor();
          _.map(_case.times, (time) => {
            const arrStartTime = time.startTime.split(":");
            const arrEndTime = time.endTime.split(":");
            const startDateTime = moment().days(time.day).hour(arrStartTime[0]).minute(arrStartTime[1]).toISOString(true);
            const endDateTime = moment().days(time.day).hour(arrEndTime[0]).minute(arrEndTime[1]).toISOString(true);
            arr.push({
              id: index,
              calendarId: index,
              title: _case.title,
              category: 'time',
              start: startDateTime,
              end: endDateTime,
              bgColor: bgColor
            });
            index++;
          });
        });
        return arr;
      }
    },
    methods: {
      getRandomHexColor() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      }
    }
  }
</script>

<style scoped>
</style>

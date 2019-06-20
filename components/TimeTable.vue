<template>
  <div id="calendar" style="height: 800px;"></div>
</template>

<script>
  import "tui-calendar/dist/tui-calendar.css";
  export default {
    name: "TimeTable",
    props: [
      'cases'
    ],
    mounted() {
      if (process.browser) {
        const Calendar = require("tui-calendar");
        var calendar = new Calendar('#calendar', {
          usageStatistics: false
        });

        if(Array.isArray(this.cases) && this.cases.length) {
          console.log(this.cases)
        }
      }
    },
    updated() {
      console.log(this.cases)
    }
  }
</script>

<style scoped>
</style>

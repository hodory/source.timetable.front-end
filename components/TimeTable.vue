<template>
  <div id="calendar" style="height: 800px;"></div>
</template>

<script>
  import "tui-calendar/dist/tui-calendar.css";
  export default {
    name: "TimeTable",
    mounted() {

      if (process.browser) {
        const Calendar = require("tui-calendar");
        var calendar = new Calendar('#calendar', {
          usageStatistics: false
        });
      }
    }
  }
</script>

<style scoped>
</style>

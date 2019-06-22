import Vue from 'vue';

if (process.browser) {
  const tui = require('@toast-ui/vue-calendar');
  const Calendar = tui.Calendar;
  Vue.component('tui-calendar', Calendar);
  Vue.use(Calendar);
}

<template>
  <section class="container">
    <div>
      <Major v-bind:handle-cases="handleCases"/>
      <TimeTable v-bind:cases="cases"/>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import TimeTable from "../components/TimeTable";
import Major from "../components/Major";

export default {
  components: {
    Major,
    TimeTable,
    AppLogo
  },
  data() {
    return {
      cases: []
    }
  },
  methods: {
    // 조회하기 버튼 선택시 처리하는 부분
    handleCases(selectedSubject) {
      this._makeCases(selectedSubject);
    },
    _makeCases(subjectList) {
      // TODO : subjectList를 받아 처리하는 부분 작성
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>


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
  import _ from "lodash";
  import Moment from 'moment';
  import {extendMoment} from 'moment-range';

  const moment = extendMoment(Moment);

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
        const optionList = _.map(selectedSubject, 'options');
        // 시간 객체를 모두 담음.
        let cases = this._makeCases(optionList);
        // TODO : 타이틀을 가져올 수 있도록 변경 필요
        // 중복 제거
        _.forEach(cases, (_case, _key) => {
          const times = _.mapValues(_case, 'times');
          let isOverlapped = false;
          let diffOverlap = [];
          _.forEach(times, (v1) => {
            _.forEach(v1, (v2) => {
              const startTime = v2.startTime.split(":");
              const endTime = v2.endTime.split(":");
              const sMoment = moment().days(v2.day).hour(startTime[0]);
              const eMoment = moment().days(v2.day).hour(endTime[0]);
              const range = moment.range(sMoment, eMoment);
              if (diffOverlap) {
                _.forEach(diffOverlap, (value) => {
                  if (range.overlaps(value)) {
                    isOverlapped = true;
                    return false;
                  }
                });
              }
              if (isOverlapped) {
                console.log(`isOverlap first | day : ${v2.day} |startTime : ${v2.startTime} | endTime : ${v2.endTime}`);
                return false;
              } else {
                diffOverlap.push(range);
              }
            });
            if (isOverlapped) {
              console.log(`isOverlap second`);
              return false;
            }
          });
          if (isOverlapped) {
            console.log(`isOverlap remove`);
            cases.splice(_key, 1);
          }
        });

        this.cases = cases;
      },
      // 가능한 경우를 만들어주는 함수
      _makeCases(arg) {
        let r = [], max = arg.length - 1;

        function helper(arr, i) {
          for (let j = 0, l = arg[i].length; j < l; j++) {
            let a = arr.slice(0);
            a.push(arg[i][j]);
            if (i === max) {
              r.push(a);
            } else
              helper(a, i + 1);
          }
        }

        helper([], 0);
        return r;
      },
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    text-align: center;
  }
</style>


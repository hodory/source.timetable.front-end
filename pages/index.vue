<template>
  <section class="container">
    <div>
      <Major v-bind:handle-cases="handleCases"/>
      <div v-if="isShowingCases">
        <button @click="_onClickPrev">이전</button>
        <span v-text="currentIndexText"></span> / <span v-text="caseCount"></span><span><button
        @click="_onClickNext">다음</button></span>
      </div>
      <TimeTable v-bind:cases="currentCase"/>
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
        currentCaseIndex: 0,
        cases: []
      }
    },
    methods: {
      // 조회하기 버튼 선택시 처리하는 부분
      handleCases(selectedSubject) {
        this.currentCaseIndex = 0;
        console.log(selectedSubject)
        if (_.isEmpty(selectedSubject)) {
          this.cases = [];
          return false;
        }
        const optionList = _.map(selectedSubject, 'options');
        // 시간 객체를 모두 담음.
        let cases = this._makeCases(optionList);
        let allCase = [];
        // 중복 제거
        _.map(cases, (_case, _key) => {
          console.log(`caseKey: ${_key} | times : ${JSON.stringify(_case)}`);
          const times = _.map(_case, 'times');
          let isOverlapped = false;
          let diffOverlap = [];
          _.map(times, (v1, k) => {
            _.map(v1, (v2) => {
              console.log(`caseKey: ${_key} | timesKey : ${k} | title : ${selectedSubject[k].title} | day : ${v2.day} |startTime : ${v2.startTime} | endTime : ${v2.endTime}`, JSON.stringify(diffOverlap));
              const startTime = v2.startTime.split(":");
              const endTime = v2.endTime.split(":");
              const sMoment = moment().days(v2.day).hour(startTime[0]).minute(startTime[1]).second(0);
              const eMoment = moment().days(v2.day).hour(endTime[0]).minute(endTime[1]).second(0);
              const range = moment.range(sMoment, eMoment);
              if (diffOverlap) {
                _.map(diffOverlap, (value) => {
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
            } else {
              _.assign(cases[_key][k], {
                "title": selectedSubject[k].title
              });
            }
          });
          if (!isOverlapped) {
            allCase.push(_case);
          }
          console.log("==================================================");
          console.log(cases);
        });

        this.cases = allCase;
      },
      // 가능한 경우를 만들어주는 함수
      _makeCases(arg) {
        let r = [], max = arg.length - 1;

        function _recursive(arr, i) {
          for (let j = 0, l = arg[i].length; j < l; j++) {
            let a = arr.slice(0);
            a.push(arg[i][j]);
            if (i === max) {
              r.push(a);
            } else
              _recursive(a, i + 1);
          }
        }

        _recursive([], 0);
        return r;
      },
      _onClickNext() {
        if (this.currentCaseIndex < this.caseCount - 1) {
          this.currentCaseIndex += 1;
          if (this.currentCaseIndex === this.caseCount) {

          }
        }
      },
      _onClickPrev() {
        if (this.currentCaseIndex > 0) {
          this.currentCaseIndex -= 1;
        }
      }
    },
    computed: {
      isShowingCases() {
        return !_.isEmpty(this.cases);
      },
      caseCount() {
        return this.cases.length;
      },
      currentCase() {
        return this.cases[this.currentCaseIndex];
      },
      currentIndexText() {
        if (this.cases.length) {
          return this.currentCaseIndex + 1;
        } else {
          return 0;
        }
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


<template>
  <div>
    <multiselect v-model="major"
                 :options="majorList"
                 :searchable="true"
                 label="label"
                 :allow-empty="false"
                 :show-labels="true"
                 track-by="label"
                 @select="onMajorChange"
                 placeholder="학과 선택">
    </multiselect>
    <subject-search-bar v-bind:subject-list="subjectList" v-bind:handle-cases="handleCases"
                        v-bind:handle-message="handleMessage"/>
  </div>
</template>

<script>
  import SubjectSearchBar from "./SubjectSearchBar";
  import Multiselect from 'vue-multiselect'
  import axios from 'axios';

  const REQUEST_BASE_URL = "https://hodory-time-table.herokuapp.com/";

  export default {
    name: "Major",
    components: {SubjectSearchBar, Multiselect},
    props: [
      'handleCases',
      'handleMessage'
    ],
    data() {
      return {
        majorList: [
          {
            "label": "컴퓨터 공학부",
            "value": "cs"
          },
          {
            "label": "건축 공학부",
            "value": "are"
          },
        ],
        subjectList: [],
        major: "",
      }
    },
    methods: {
      async onMajorChange(major) {
        const {value} = major;
        if (value) {
          try {
            const {data} = await axios.get(`${REQUEST_BASE_URL}/v1/subject/list?major=${value}`);
            this.subjectList = data.list;
            this.handleMessage("과목을 선택해주세요");
          } catch (e) {
            this._resetList();
            alert("해당 학과에 등록된 과목이 없습니다.");
            this.handleMessage("학과를 다시 선택해주세요");
            console.log(e.toLocaleString());
          }
        } else {
          this._resetList();
        }
      },
      _resetList() {
        this.handleCases([]);
        this.subjectList = [];
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>

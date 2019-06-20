<template>
  <div v-if="isNotEmptyList">
    <multiselect v-model="selected"
                 :multiple="true"
                 :options="subjectList"
                 :searchable="true"
                 :close-on-select="false"
                 :clear-on-select="false"
                 label="title"
                 :allow-empty="true"
                 :show-labels="true"
                 track-by="title"
                 :preselect-first="false"
                 @select="_onSelect"
                 @input="_onInput"
                 @remove="_onRemove"
                 placeholder="과목 선택">
    </multiselect>
    <div>
      {{totalGrade}} 학점이 선택되었습니다.
    </div>
    <SubmitButton :selectedList="selected" v-bind:handle-cases="handleCases"/>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import SubmitButton from "./SubmitButton";

  export default {
    name: "SubjectSearchBar",
    components: {SubmitButton, Multiselect},
    props: [
      'subjectList',
      'handleCases'
    ],
    data() {
      return {
        selected: [],
        totalGrade : 0,
      }
    },
    computed: {
      isNotEmptyList() {
        return (Array.isArray(this.subjectList) && this.subjectList.length)
      }
    },
    methods:{
      _onSelect(selectedItem) {
        this.totalGrade += selectedItem.grade;
      },
      _onInput() {
        if(this.totalGrade > 21) {
          this._onRemove(this.selected.pop());
          alert('21학점 이상 수강 할 수 없습니다.');
          return false;
        }
      },
      _onRemove(deletedItem) {
        this.totalGrade -= deletedItem.grade;
      }
    }
  }
</script>
<style scoped>
</style>

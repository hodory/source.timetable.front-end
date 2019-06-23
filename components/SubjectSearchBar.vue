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
    <SubmitButton v-if="isShowButton" :selectedList="selected" v-bind:handle-cases="handleCases"/>
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
      'handleCases',
      'handleMessage',
      'selected',
      'totalGrade'
    ],
    computed: {
      isNotEmptyList() {
        return (Array.isArray(this.subjectList) && this.subjectList.length)
      },
      isShowButton() {
        return this.totalGrade >= 18;
      }
    },
    methods: {
      _onSelect(selectedItem) {
        this.totalGrade += selectedItem.grade;
      },
      _onInput() {
        if (this.totalGrade > 21) {
          this._onRemove(this.selected.pop());
          alert('21학점 이상 수강 할 수 없습니다.');
          return false;
        }
        this._handleMessage();
      },
      _onRemove(deletedItem) {
        this.totalGrade -= deletedItem.grade;
        this._handleMessage();
      },
      _handleMessage() {
        if (this.totalGrade < 18) {
          this.handleMessage("18학점 이상 선택을 하셔야 시간표 조회가 가능합니다.");
        } else {
          this.handleMessage("조회하기 버튼을 눌러 결과를 확인하세요");
        }
      },
    }
  }
</script>
<style scoped>
</style>

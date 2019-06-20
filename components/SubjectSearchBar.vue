<template>
  <div v-if="isNotEmptyList">
    <multiselect v-model="selected"
                 :multiple="true"
                 :options="subjectList"
                 :searchable="true"
                 :close-on-select="false"
                 :clear-on-select="false"
                 label="title"
                 :allow-empty="false"
                 :show-labels="true"
                 track-by="title"
                 :preselect-first="false"
                 :taggable="true"
                 placeholder="과목 선택">
    </multiselect>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    name: "SubjectSearchBar",
    components: {Multiselect},
    props: [
      'subjectList'
    ],
    data() {
      return {
        selected: []
      }
    },
    computed: {
      isNotEmptyList() {
        return (Array.isArray(this.subjectList) && this.subjectList.length)
      }
    }
  }
</script>
<style scoped>
</style>

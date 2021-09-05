<template>

<div>
<div class="form-wrapper">
  <md-field>
    <label>Наименование</label>
    <md-input v-model="searchData.name"></md-input>
  </md-field>
  <md-field>
    <label>Автор</label>
    <md-input v-model="searchData.author"></md-input>
  </md-field>
  <md-field>
    <label>Дата от</label>
    <md-input v-model="searchData.dateFrom"></md-input>
  </md-field>
  <md-field>
    <label>Дата до</label>
    <md-input v-model="searchData.dateTo"></md-input>
  </md-field>
  <md-field class="form-wrapper__select">
    <label>Жанры</label>
    <md-select v-model="searchData.genreIds"
               multiple
    >
      <md-option v-for="(option, index) in genresList"
                 v-bind:key="index"
                 v-bind:value="option.id">
        {{option.name}}
      </md-option>
    </md-select>
  </md-field>

  <button class="form-wrapper__btn"
          @click="search()">
    Найти
  </button>
  <button class="form-wrapper__btn"
          @click="cleanSearch()">
    Сброс
  </button>
</div>
</div>

</template>

<script>

export default {
  name: 'Search',
  props: ['searchParams', 'genresList'],
  data: function () {
    return {
      searchData : {
        name: '',
        author: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        genreIds: [],
      }
    }
  },
  methods:{ 
   search() {
     const params = this.getActualParamsForSearch();
     this.searchParams(params);
   },
    getActualParamsForSearch() {
      return Object.keys(this.searchData)
          .filter(key => key === 'genreIds' ? this.searchData[key].length : this.searchData[key])
          .reduce((acc, key) => ({...acc, [key]: this.searchData[key]}), {});
    },
    cleanSearch(){
      this.searchParams()
      for (let key in this.searchData) {this.searchData[key]=''}
      this.searchData.genreIds =[]
    }
  }
}
  
  
</script>


<style scoped>

.form-wrapper {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.form-wrapper > * {
  margin: 0 10px;
  max-width: 150px;
}
.form-wrapper__select {
  display: inline-flex;
  width: auto;
}
.form-wrapper__btn {
  width: 150px;
  height: 30px;
}


</style>

<template>

<div class="book">
<div>{{data.name}}</div>
<div>{{data.author}}</div>
<div>{{data.date}}</div>
<div>{{getGenres(data)}}</div> 
    <button @click="() => deleteBook(data)">Удалить</button>
    <button @click="() => edit(data)">Редактировать</button>
</div>

</template>

<script>


export default {
  name: 'Book',
  props: 
  ['data', 'edit','deleteBook'],
  methods:{ 
    getGenres(book) {
      return book.genre.map(genr => genr.name).join(',');
    },
   
    },
   
  
}
  
  
</script>


<style scoped>

.book{
  width: 120px;
  padding: 10px;
  margin:50px;
  border: 1px solid black;
  text-align: center;
  background: olive;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  word-break: break-all;
  height: 200px;
}

</style>

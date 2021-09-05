<template>
<div>
  <div class="list-methods">
  <div class="book-method">
  
  <input class="Input" type="text" v-model="newBook.name" placeholder="введите имя книги">
  <input class="Input" type="text" v-model="newBook.author" placeholder="автор книги">
  <input class="Input" type="number" v-model="newBook.date" placeholder="дата в формате уууу" @input="checkDate">
    <md-field class="form-wrapper__select">
      <label>укажите жанр</label>
      <md-select v-model="newBook.genreIds"
                 multiple
      >
        <md-option v-for="(option, index) in genresList"
                   v-bind:key="index"
                   v-bind:value="option.id">
          {{option.name}}
        </md-option>
      </md-select>
    </md-field>
  <input class="Input" type="text" v-model="newBook.description" placeholder="введите описание">
  <br>
<button class="btn" @click="() => createBook(this.newBook)"> Создать</button>

</div>
  <div class="book-method">
  
  <input class="Input" type="text" v-model="updatedBook.name" placeholder="введите имя книги">
  <input class="Input" type="text" v-model="updatedBook.author" placeholder="автор книги">
  <input class="Input" type="number" v-model="updatedBook.date" placeholder="дата в формате уууу" @input="checkDate">
    <md-field class="form-wrapper__select">
      <label>укажите жанр</label>
      <md-select v-model="updatedBook.genreIds"
                 multiple
      >
        <md-option v-for="(option, index) in genresList"
                   v-bind:key="index"
                   v-bind:value="option.id">
          {{option.name}}
        </md-option>
      </md-select>
    </md-field>
  <input class="Input" type="text" v-model="updatedBook.description" placeholder="введите описание">
  <br>
<button class="btn" @click="() => update(updatedBook)"> Редактировать</button>
</div>
    <div class="book-method">
      <p>Страница</p>
      <input class="Input" type="text" v-model="pageNumber" placeholder="Номер страницы">
      <p>Количество книг на странице</p>
      <input class="Input" type="text" v-model="countElementsOnPage" placeholder="Количество элементов на странице">
      <button class="btn" @click="() => decideShowBook()">Обновить</button>
    </div>
  </div>

  <Search
      v-bind:searchParams="getBooksList"
      v-bind:genresList="genresList"
  >
  </Search>

  <div class="book-wrapper">
    <Book v-for="book in booksList"
          :key="book.id"
          v-bind:data="book"
          v-bind:edit="edit"
          v-bind:deleteBook="deleteBook"
    >

    </Book>
  </div>
</div>
</template>

<script>
import Search from './Search.vue'
import Book from './Book.vue'
import {
  getBooksListApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
  getGenresList
} from "../common/api.js"


export default {
  name: 'List',
  components: {
    Book,
    Search
  },
  props: {},
  
  data: function(){
      return {
        booksList:[],
        showBooks:[],
        newBookgenre:'',
        updateBookgenre:'',
        correctDate:true,
        pageNumber: 1,
        countElementsOnPage: 10,

        newBook:{
          name: "",
          author: "",
          description: "",
          date: "",
          genreIds: []
        },
        updatedBook:{
          id: null,
          name: "",
          author: "",
          description: "",
          date: "",
          genreIds: []
        },
        genresList: []
      }
  },
      
  methods:{
    getBooksList(searchParams = {}){
      getBooksListApi(searchParams).then(result => {
        this.booksList = result;
        this.decideShowBook();
      })
    },
    createBook(){ 
      if (!this.correctDate) {
        alert('введите дату в верном формате')
        this.newBook.date=''
      } else {
         createBookApi(this.newBook).then(() => {
           for (let key in this.newBook) {this.newBook[key]=''}
           this.getBooksList();
         });
      }
    this.newBook.genreIds =[]
    },
    createGenre(){
      this.newBook.genreIds.push(+this.newBookgenre)
      this.newBookgenre=''
    },
    deleteBook(book){
      deleteBookApi(book.id).then(() => this.getBooksList());
    },
  
    checkDate(event){
      this.correctDate = /^[0-9]{4}$/.test(event.target.value);
    },
    edit(book) {
      this.updatedBook.id = book.id;
      this.updatedBook.name = book.name;
      this.updatedBook.author = book.author;
      this.updatedBook.name = book.name;
      this.updatedBook.date = book.date;
      this.updatedBook.description = book.description;
      this.updatedBook.genreIds = book.genre.map(genr => genr.id);
    },
    update(book) {
      updateBookApi(book.id, book).then(() => this.getBooksList());
    },
    getVisibleBook(){
      const firstElementIndex = (this.pageNumber - 1) * this.countElementsOnPage;
      const lastElementIndex = this.pageNumber * this.countElementsOnPage;
      return this.booksList
          .filter((book,index) => firstElementIndex <= index && lastElementIndex > index);
    },
    decideShowBook() {
      this.showBooks = this.getVisibleBook();
    }
  },

  mounted(){
    this.getBooksList();
    getGenresList().then(genres => this.genresList = genres);
  },
  
}
</script>


<style scoped>

.book-method{
  border: 1px solid black;
  width: 220px;
  display: flex;
  flex-direction: column;
  margin: 50px;
  padding: 20px;}
.book-wrapper{
  display: flex;
  flex-wrap: wrap;
}
.Input{
  margin: 7px;
 
}
.btn{
  width: 110px;
  text-align: center;
  margin:0 auto;
}
.list-methods{
  display: flex;
  justify-content: center;
}

</style>

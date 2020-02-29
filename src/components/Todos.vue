<template>
  <div class="container">
    <ul class="todos">
      <transition-group name="todo-list">
        <li v-for="(todo, index) in todos" :key="todo.id">
          <input type="checkbox" :id="'item-' + index" v-model="todo.isCompleted">
          <label :for="'item-' + index" class="text" @click="changeTodoStatus(index)"> {{ todo.content }}</label>
          <label :for="'item-' + index" class="button"/>
          <div class="wrapper" @click="changeTodoStatus(index)">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 98.5 98.5" enable-background="new 0 0 98.5 98.5" xml:space="preserve">
              <path class="checkmark" fill="none" stroke-width="8" stroke-miterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4
              C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"/>
            </svg>
          </div>
          <div class="wrapper wrapper__cross" @click="deleteTodo(index)">
            <svg class="cross-icon" viewBox="0 0 20 20">
              <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"/>
            </svg>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted () {
    this.fetchData();
  },
  data () {
    return {
      isLoading: false,
    }
  },
  methods: {
    fetchData () {
      this.isLoading = true;
      fetch("https://todos-91933.firebaseio.com/todos.json")
      .then(response => response.json())
      .then(data => {
        let ids = Object.keys(data);
        ids.forEach(id => data[id].id = id);
        let todos = Object.values(data);
        this.$store.commit('setTodos', todos);
        this.isLoading = false ;
      });
    },
    deleteTodo (index) {
      //TODO: ask for confirm in modal!
      this.$store.dispatch('deleteTodo', {id: this.todos[index].id, index});
    },
    changeTodoStatus (index) {
      let todo = Object.assign({}, this.todos[index]);
      todo.isCompleted = !todo.isCompleted;
      this.$store.dispatch('updateTodo', {id: todo.id, todo: todo, index});
    }
  },
  computed: {
    ...mapState({
      todos: state => state.todos,
    }),
  }
}
</script>

<style scoped lang="scss">
  .container {
    margin: 30px auto;
    width: 300px;
    box-shadow: 1rem 1rem .5rem rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  .todos {
    list-style: none;
    padding: 36px;
    margin: 0;
    border-radius: 3px;
    background: rgba(243, 229, 255, 0.31);
  }
  .todos li {
    position: relative;
    display: block;
    margin: 24px 0;
    height: 14px;
  }
  .todo-list-enter-active, .todo-list-leave-active {
    position: absolute;
    transition: all .4s;
  }
  .todo-list-enter, .todo-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .todos .text {
    float: left;
    font-size: 1.3rem;
    cursor: pointer;
  }
  .button {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    float: right;
    width: 20px;
    height: 20px;
    border: 1px solid fade-out(rgb(101, 53, 137), .5);
    border-radius: 50%;
    cursor: pointer;
  }
  .todos li input {
    display: none;
  }
  .todos .checkmark {
    position: absolute;
    stroke: rgba(100, 58, 122, .5);
    fill: none;
    stroke-dashoffset: 340;
    stroke-dasharray: 360;
  }
  .checkmark {
    display: block;
    stroke-width: 8;
    opacity: 0;
  }
  .todos input:checked ~ {
    .text {
      color: rgba(100, 58, 122, .5);
    }
    .wrapper .checkmark {
      animation: dash .5s ease-out forwards;
      opacity: 1;
    }
    .button {
      opacity: 0;
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 340;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  ul li .wrapper {
    position: absolute;
    width: 20px;
    right: 0;
  }
  .wrapper__cross {
    left: -20px;
    cursor: pointer;
  }
  .cross-icon {
    width: 1em;
    height: 1em;
    transition: all .3s;
  }
  .cross-icon:hover {
    transform: rotate(-90deg);
  }
  .cross-icon path {
    fill: rgb(41, 0, 83);
  }
</style>

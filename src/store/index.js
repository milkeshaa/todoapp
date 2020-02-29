import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  actions: {
    addTodo ({commit, state}, todo) {
      return fetch('https://todos-91933.firebaseio.com/todos.json', {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          todo.id = data.name;
          commit('addTodo', todo);
        })
        .catch(err => alert(err));
    },
    deleteTodo ({commit, state}, data) {
      return fetch(`https://todos-91933.firebaseio.com/todos/${data.id}.json`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        commit('deleteTodo', data.index);
      }).catch(err => alert(err));
    },
    updateTodo ({commit, state}, data) {
      delete data.todo.id;
      return fetch(`https://todos-91933.firebaseio.com/todos/${data.id}.json`, {
        method: "PUT",
        body: JSON.stringify(data.todo),
        headers: {
          'Content-Type': 'application/json',
        }
      }).catch(err => alert(err));
    }
  },
  mutations: {
    setTodos (state, todos) {
      state.todos = todos;
    },
    addTodo (state, todo) {
      state.todos.push(todo);
    },
    deleteTodo (state, id) {
      state.todos.splice(id, 1);
    },
  },
});

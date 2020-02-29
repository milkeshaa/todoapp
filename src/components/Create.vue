<template>
  <form class="create-block" @submit="createNewTodo">
    <input type="text" class="create-block__input" v-model="todo.content" placeholder="Что надо сделать?">
    <button type="submit" class="create-block__button" @click="createNewTodo" :disabled="isLoading">Создать задачу</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      todo: {
        content: '',
        isCompleted: false
      },
      isLoading: false,
    }
  },
  methods: {
    createNewTodo (event) {
      event.preventDefault();
      if (!this.todo.content) {
        return;
      }
      this.isLoading = true;
      this.todo.content = this.todo.content.trim();
      this.$store.dispatch('addTodo', Object.assign({}, this.todo))
        .then(() => {
          this.todo.content = '';
          this.isLoading = false;
        })
    }
  }
}
</script>

<style scoped lang="scss">

  .create-block {
    margin: 0 auto;
    width: 300px;
    box-shadow: 1rem 1rem .5rem rgba(0, 0, 0, 0.15);
    background: rgba(243, 229, 255, 0.31);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .create-block__input {
    padding: 8px;
    margin: 8px auto;
    width: 70%;
    border: 1px solid fade-out(rgb(101, 53, 137), .5);
    border-radius: 3px;
    font-size: 16px;
    text-align: center;
  }
  input[placeholder] {
    text-overflow:ellipsis;
  }
  .create-block__input::-webkit-input-placeholder {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  .create-block__input:focus::-webkit-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .create-block__input:focus, .create-block__button:focus {
    outline: none;
  }
  .create-block__button {
    border: 1px solid fade-out(rgb(101, 53, 137), .5);
    border-radius: 3px;
    cursor: pointer;
    padding: 8px;
    margin: 8px auto;
    width: 50%;
    font-size: 16px;
    font-weight: lighter;
    background: rgba(243, 229, 255, 0.25);
    transition: all .3s;
  }
  .create-block__button:hover {
    background: rgba(183, 118, 255, 0.17);
  }
</style>

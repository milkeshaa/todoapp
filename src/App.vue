<template>
  <div id="app">
      <header class="header" :class="{'header_with-opened-links': isOpened}">
        <a class="link link_main">TodoApp</a>
        <div class="burger-menu">
          <input id="menu__toggle" type="checkbox" @change="changeMenuState"/>
          <label class="menu__button" for="menu__toggle">
            <span></span>
          </label>
        </div>
        <nav class="links" :class="{'links_opened': isOpened}">
          <a class="link" v-for="action in availableActions">
            {{ action.name }}
          </a>
        </nav>
      </header>
    <todos/>
    <create/>
  </div>
</template>

<script>
import Create from './components/Create';
import Todos from './components/Todos';

export default {
  data () {
    return {
      availableActions: [
        {type: "list", name: "Список задач"},
        {type: "login", name: "Войти"},
      ],
      isOpened: false,
    }
  },
  methods: {
    changeMenuState () {
      this.isOpened = !this.isOpened;
    }
  },
  components: {
    Create,
    Todos,
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    background-color: rgba(126, 0, 233, 0.36);
  }
  .burger-menu, #menu__toggle {
    display: none;
  }
  .header {
    background: rgb(113, 21, 185);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    transition: all .4s;
  }
  .links, .link {
    padding: 20px;
    transition: all 0.3s;
    cursor: pointer;
  }
  .link {
    color: white;
    font-size: 18px;
  }
  .link:hover {
    background: rgb(101, 53, 137);
    border-radius: 12px;
  }
  .link_main {
    font-size: 36px;
    font-weight: bold;
  }
  .link_main:hover {
    background: transparent;
  }
  @media screen and (max-width: 500px) {
    .burger-menu {
      display: block;
    }
    .menu__button {
      display: flex;
      align-items: center;
      position: absolute;
      top: 30px;
      right: 30px;
      width: 26px;
      height: 26px;
      cursor: pointer;
      z-index: 1;
    }
    .menu__button > span,
    .menu__button > span::before,
    .menu__button > span::after {
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #ffffff;
    }
    .menu__button > span::before {
      content: '';
      top: -8px;
    }
    .menu__button > span::after {
      content: '';
      top: 8px;
    }
    #menu__toggle:checked ~ .menu__button > span {
      transform: rotate(45deg);
    }
    #menu__toggle:checked ~ .menu__button > span::before {
      top: 0;
      transform: rotate(0);
    }
    #menu__toggle:checked ~ .menu__button > span::after {
      top: 0;
      transform: rotate(90deg);
    }
    .links {
      display: none;
    }
    .header_with-opened-links {
      flex-direction: column;
      height: 235px;
    }
    .links_opened {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .menu__button > span,
    .menu__button > span::before,
    .menu_menu__button_btn > span::after {
      transition-duration: .27s;
    }
    .links {
      transition-duration: .25s;
    }
    .link {
      transition-duration: .25s;
    }
  }
</style>

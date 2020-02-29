<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
  .loader-container {
    display: flex;
    justify-content: center;
  }
  .loader {
    height: 80px;
    width: 80px;
    border: 5px solid transparent;
    border-top-color: rgb(113, 21, 185);
    border-bottom-color: rgb(113, 21, 185);
    border-radius: 50%;
    position: relative;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }
  .loader::before {
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    border: 5px solid transparent;
    border-top-color: rgba(126, 0, 233, 0.36);
    border-bottom-color: rgba(126, 0, 233, 0.36);
    border-radius: 50%;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

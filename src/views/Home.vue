<template>
  <div class="home">
    <div>
      Velkommen til <span>{{ userInfo }}</span>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UserInfoStore from "../app/user-info-store";

export default {
  name: "Home",
  data: function () {
    return {
      userInfo: UserInfoStore.state.cognitoInfo,
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

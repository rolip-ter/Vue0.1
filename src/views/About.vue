<template>
  <div class="about">
    <h1>This is an about page for {{ userInfo }}</h1>
  </div>
</template>

<script>
import UserInfoStore from "../app/user-info-store";
console.log(UserInfoStore);
export default {
  name: "About",
  data: function () {
    return {
      userInfo: UserInfoStore.state.cognitoInfo,
    };
  },
  components: {},
};
</script>

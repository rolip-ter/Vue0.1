<template>
  <q-layout>
    <q-header class="glossy">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat label="Hjem" />
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
        <q-tabs v-model="tab" inline-label shrink>
          <q-route-tab icon="house" label="Home" to="/" />
          <q-route-tab icon="mail" left label="About" to="/about" />
          <q-btn-dropdown icon="house" stretch flat label="Dropdown">
            <q-list>
              <q-item-label header>Konto</q-item-label>
              <q-item
                to="/Account/Account"
                clickable
                v-close-popup
                tabindex="0"
              >
                <q-item-section avatar>
                  <q-avatar
                    icon="folder"
                    color="secondary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Min konto</q-item-label></q-item-section
                >
              </q-item>

              <q-separator inset spaced />
              <q-item clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar
                    icon="assignment"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logg ut</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    // HelloWorld,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

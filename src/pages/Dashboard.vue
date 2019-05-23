<template>
  <q-layout view="hHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <!-- First row of header is a QToolbar -->
      <q-toolbar>
        <!-- showLeft is a model attached to left side drawer below -->
        <!-- <q-btn flat round dense @click="showLeft = !showLeft" icon="menu"/> -->

        <q-toolbar-title>
          My Vehicle
          <span slot="subtitle">Vehicle management app</span>
        </q-toolbar-title>

        <!-- showRight is a model attached to right side drawer below -->
        <!-- <q-btn flat round dense @click="showRight = !showRight" icon="menu"/> -->
      </q-toolbar>

      <!-- Second row of header is a QTabs
      <q-tabs>
        <q-route-tab
          slot="title"
          icon="view_quilt"
          to="/test-layout/about"
          replace
          hide="icon"
          label="About"
        />
        <q-route-tab
          slot="title"
          icon="view_day"
          to="/test-layout/toolbar"
          replace
          hide="icon"
          label="Toolbar"
        />
        <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" replace label="Tabs"/>
        <q-route-tab slot="title" icon="input" to="/test-layout/drawer" replace label="Drawer"/>
      </q-tabs>-->
    </q-layout-header>

    <!-- Left Side Drawer -->
    <q-layout-drawer side="left" v-model="showLeft">
      <q-list no-border link inset-separator>
        <!-- <q-list-header>Essential Links</q-list-header> -->
        <q-item to="/dashboard/vehicles">
          <q-item-side icon="local_taxi"/>
          <q-item-main label="Vehicles"/>
        </q-item>
        <q-item to="/dashboard/profile">
          <q-item-side icon="person"/>
          <q-item-main label="Profile"/>
        </q-item>
        <q-item to="/dashboard/chat">
          <q-item-side icon/>
          <q-item-main label="Notification"/>
        </q-item>
        <q-item to="/dashboard/twitter">
          <q-item-side icon="logout"/>
          <q-item-main label="Logout"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <!-- sub-routes get injected here: -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- Footer -->
    <q-layout-footer>
      <q-toolbar-title>All Rights Reserved &copy 2019</q-toolbar-title>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      showLeft: true
    };
  }
};
</script>

<style>
</style>

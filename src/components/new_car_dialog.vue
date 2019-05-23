<template>
  <q-modal v-model="opened">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat round dense icon="keyboard_arrow_left"/>
        <q-toolbar-title>Add new vehicle</q-toolbar-title>
      </q-toolbar>
      <div style="padding: 0px 10px">
        <q-field :error="errors.name" :error-label="errors.name" :count="10">
          <q-input float-label="name" v-model="fields.name"/>
        </q-field>
        <q-field :error="errors.model" :error-label="errors.model" :count="10">
          <q-input float-label="model" v-model="fields.model"/>
        </q-field>
        <q-field :error="errors.registration_no" :error-label="errors.registration_no" :count="10">
          <q-input float-label="registration_no" v-model="fields.registration_no"/>
        </q-field>
        <q-field
          :error="errors.non_field_errors"
          :error-label="errors.non_field_errors"
          :count="10"
        >
          <q-input
            float-label="password2"
            v-model="fields.password2"
            type="password"
            v-show="false"
          />
        </q-field>
      </div>

      <q-btn slot="footer" style="width:100%" color="primary" @click="submit">Submit</q-btn>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      fields: {},
      errors: {}
    };
  },
  methods: {
    submit: async function() {
      console.log(777);
      this.$q.loading.show();
      try {
        let data = await this.$api.auth_post("vehicles/", this.fields);
        this.$q.notify("Car Added");
        this.opened = false;
        this.$q.loading.hide();
      } catch (err) {
        this.$q.loading.hide();
        if (err.response) {
          this.errors = err.response.data;
          this.$q.notify("Validation error");
        } else {
          console.debug(err);
          this.$q.notify("Unknown error");
        }
      }
    }
  },
  props: ["value"],
  watch: {
    value(val) {
      this.opened = val;
    },
    opened(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>

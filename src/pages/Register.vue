<template>
  <q-page class="flex flex-center" minimized>
    <q-modal v-model="login_opened">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat round dense icon="keyboard_arrow_left"/>
          <q-toolbar-title>Register</q-toolbar-title>
        </q-toolbar>
        <div style="padding: 0px 10px">
          <q-field :error="errors.email" :error-label="errors.email" :count="10">
            <q-input float-label="email" v-model="fields.email"/>
          </q-field>
          <q-field :error="errors.firstname" :error-label="errors.firstname" :count="10">
            <q-input float-label="firstname" v-model="fields.firstname"/>
          </q-field>
          <q-field :error="errors.lastname" :error-label="errors.lastname" :count="10">
            <q-input float-label="lastname" v-model="fields.lastname"/>
          </q-field>
          <q-field :error="errors.password1" :error-label="errors.password1" :count="10">
            <q-input float-label="password1" v-model="fields.password1" type="password"/>
          </q-field>
          <q-field :error="errors.password2" :error-label="errors.password2" :count="10">
            <q-input float-label="password2" v-model="fields.password2" type="password"/>
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

        <q-btn slot="footer" color="primary" @click="submit">Submit</q-btn>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "PageIndex",
  data() {
    return {
      fields: {
        email: ""
      },
      errors: {},
      login_opened: true
    };
  },
  validations: {
    fields: {
      email: { required, email }
    }
  },
  computed: {
    // errors() {
    //   let errors = [];
    //   this.localError.forEach(member => {
    //     console.log(member);
    //   });
    // }
  },
  methods: {
    submit: async function() {
      window.app = this;
      this.$v.fields.$touch();

      if (this.$v.fields.$error) {
        this.$q.notify("Please review fields again.");
        return;
      }
      this.$q.loading.show();
      try {
        let data = await this.$api.register(this.fields);
        this.$q.notify("Registration successful");
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
  }
};
</script>

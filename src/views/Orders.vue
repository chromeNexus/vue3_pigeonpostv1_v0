<template>
  <form @submit.prevent="onSubmit">
    <div class="root">
      <h2>Create Shipment</h2>

      <input type="text" placeholder="email" v-model="state.email" />
      <span v-if="val.email.$error">{{ val.email.$errors[0].$message }}</span>

      <input
        type="password"
        placeholder="password"
        v-model="state.password.password"
      />
      <span v-if="val.password.password.$error">{{
        val.password.password.$errors[0].$message
      }}</span>

      <input
        type="password"
        placeholder="confirm password"
        v-model="state.password.confirm"
      />
      <span v-if="val.password.confirm.$error">{{
        vally.password.confirm.$errors[0].$message
      }}</span>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      email: "",
      password: {
        password: "",
        confirm: "",
      },
    });
    const mustBeLearnVue = (value) => value.includes("learnvue");
    const rules = computed(() => {
      return {
        email: {
          required,
          email,
          mustBeLearnVue: helpers.withMessage(
            "This is a custom message",
            mustBeLearnVue
          ),
        },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password) },
        },
      };
    });

    const val = useValidate(rules, state);
    return {
      state,
      val,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.val);
      this.val.$validate();
      if (!this.val.$error) {
        alert("form successfully submitted");
      } else {
        alert("form didnt pass validation");
      }
    },
  },
};
</script>

<template>
  <div class="TextInput">
    <label class="block text-sm font-medium text-gray-700" :for="name">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        class="
          shadow-sm
          focus:ring-indigo-500
          focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border-gray-300
          rounded-md
        "
        :name="name"
        :id="id"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
      />
    </div>

    <p>
      <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
    </p>
  </div>
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
    return { state, val };
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

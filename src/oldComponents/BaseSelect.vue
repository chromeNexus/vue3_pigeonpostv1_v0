<template>
  <div
    class="TextInput"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label class="block text-sm font-medium text-gray-700" v-if="label">{{
      label
    }}</label>
    <select
      class="
        mt-1
        block
        w-full
        pl-3
        pr-10
        py-2
        text-base
        border-gray-300
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
        rounded-md
      "
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value);
        },
      }"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
    <BaseSelectNew />
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    successMessage: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });
    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

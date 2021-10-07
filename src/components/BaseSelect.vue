<template>
  <label v-if="label" class="block text-sm font-medium text-gray-700">{{
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
    :placeholder="label"
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
</template>

<script>
export default {
  props: {
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
  },
};
</script>

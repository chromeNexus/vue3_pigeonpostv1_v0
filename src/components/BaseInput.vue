<!-- class=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full
sm:text-sm border-gray-300 rounded-md"
-->
<template>

  <label v-if="label" class="block text-sm font-medium text-gray-700">{{
    label
  }}</label>
  <div class="mt-1">
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
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
    />
  </div>
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
    modelModifiers: {
      default: () => ({}),
    },
  },
};
</script>

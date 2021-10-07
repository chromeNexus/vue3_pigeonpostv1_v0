<!-- 
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
      :value="option.value"
      :key="option"
      :selected="option === modelValue"
    >
    <img src="option.img" /> {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selected: "A",
      options: [
        { text: "One", img:"https://picsum.photos/200/300", value: "A" },
        { text: "Two", img:"https://picsum.photos/200/300", value: "B" },
        { text: "Three",img: "https://picsum.photos/200/300", value: "C" },
      ],
    };
  },

  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    }, -->
<!--
    /*  options: {
      type: Array,
      required: true,
    }, */
  },
};
</script>
 -->
<template>
  <div>
    <Multiselect v-model="value" :options="options" />
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: [
        {
          title: "Batman",
          value: "batmanVal",
          img: "https://i.picsum.photos/id/930/200/200.jpg?hmac=RFuPrtDvQpcnLHYqLKXd8mbb6jxqDE1g0387zdxBVNg",
        },
        {
          title: "Robin",
          value: "robinVal",
          img: "https://i.picsum.photos/id/930/200/200.jpg?hmac=RFuPrtDvQpcnLHYqLKXd8mbb6jxqDE1g0387zdxBVNg",
        },
        {
          title: "Joker",
          value: "jokerVal",
          img: "https://i.picsum.photos/id/930/200/200.jpg?hmac=RFuPrtDvQpcnLHYqLKXd8mbb6jxqDE1g0387zdxBVNg",
        },
      ],
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

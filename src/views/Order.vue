<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
          Create Shipment
          </h3>
          <p class="mt-1 text-sm text-gray-500">
           Enter shipment info.
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <BaseInput
            v-model="state.batch.shipTo.name"
            label="Name"
            type="text"
          />
          </div>

          <div class="sm:col-span-3">
             <BaseInput
            v-model="state.batch.shipTo.company"
            label="Company"
            type="text"
          />
          </div>

          <div class="sm:col-span-3">
            <BaseInput
           v-model="state.batch.shipTo.street1"
            label="Address Line 1"
            type="text"
          />
          </div>

          <div class="sm:col-span-3">
             <BaseInput
            v-model="state.batch.shipTo.street2"
            label="Address Line 2"
            type="text"
          />
          </div>

          <div class="sm:col-span-2">
            <BaseInput
            v-model="state.batch.shipTo.city"
            label="City"
            type="text"
          />
          </div>

          <div class="sm:col-span-2">
            <BaseInput
            v-model="state.batch.shipTo.state"
            label="State"
            type="text"
          />
          </div>

          <div class="sm:col-span-2">
            <BaseInput
            v-model="state.batch.shipTo.postal"
            label="Postal / Zip Code"
            type="text"
          />
          </div>
          <div class="sm:col-span-4">
            <BaseSelect
            :options="countries"
            v-model="state.batch.shipTo.country"
            label="Country"
          />
          </div>

          <div class="sm:col-span-3">
            <BaseInput
           v-model="state.batch.shipTo.email"
            label="Email"
            type="text"
          />
          </div>

          <div class="sm:col-span-3">
             <BaseInput
            v-model="state.batch.shipTo.phone"
            label="Phone"
            type="text"
          />
          </div>

          <div class="sm:col-span-6">
             <h3>Residential Address</h3>
          <BaseRadioGroup
            v-model="state.batch.shipTo.residential"
            name="Residential Address"
            modelValue="Boolean"
            :options="residential"
          />
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Package Options
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Choose package option
          </p>
        </div>

         <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <BaseSelPack
          />
          </div>
        </div>
        <div>
          <x3 class="text-lg leading-6 font-medium text-gray-900">
            Package Dimensions
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Enter Package Dimensions
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <BaseInput
            v-model.trim.number="state.batch.packOpt.length"
            label="Length"
            type="text"
          />
          </div>
          <div class="sm:col-span-2">
            <BaseInput
            v-model.trim.number="state.batch.packOpt.width"
            label="Width"
            type="text"
          />
          </div>
          <div class="sm:col-span-2">
            <BaseInput
            v-model.trim.number="state.batch.packOpt.height"
            label="Height"
            type="text"
          />
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Package Weight
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Enter Package Weight
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <BaseInput
            v-model.trim.number="state.batch.packOpt.wtPounds"
              label="Pounds"
              type="text"
          />
          </div>
          <div class="sm:col-span-3">
            <BaseInput
            v-model.trim.number="state.batch.packOpt.wtOunces"
              label="Ounces"
              type="text"
          />
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();
import useValidate from "@vuelidate/core";
import vSelect from "vue-select";

import {
  required,
  email,
  numeric,
  decimal,
  minValue,
  alphaNum,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";
export default {
  setup() {
    const countries = ref(["US", "CA", "MX"]);
    const residential = [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ];

    const state = reactive({
      batch: {
        warehouse: "",
        orders: [],
        shipTo: {
          name: "",
          company: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          country: "",
          postal: "",
          email: "",
          phone: "",
          residential: null,
        },
        packOpt: {
          packageType: "",
          length: null,
          width: null,
          height: null,
          wtPounds: null,
          wtOunces: null,
        },
      },
      password: {
        password: "",
        confirm: "",
      },
    });
    const phoneVal = (value) => phoneUtil.isValidNumber(value);
    const mustBeLearnVue = (value) => value.includes("learnvue");
    const rules = computed(() => {
      return {
        batch: {
          shipTo: {
            name: {
              required: helpers.withMessage("Name required", required),
              alphaNum: helpers.withMessage("Name required", alphaNum),
            },
            company: {
              alphaNum: helpers.withMessage("Invalid Company", alphaNum),
            },
            street1: {
              required: helpers.withMessage("Enter address", required),
              alphaNum: helpers.withMessage("Enter Address", alphaNum),
            },
            street2: {
              alphaNum: helpers.withMessage("Invalid address", alphaNum),
            },
            city: {
              required: helpers.withMessage("City required", required),
              alphaNum: helpers.withMessage("City required", alphaNum),
            },
            state: {
              required: helpers.withMessage("State required", required),
              alphaNum: helpers.withMessage("State required", alphaNum),
            },
            country: {
              required: helpers.withMessage("Country required", required),
              alphaNum: helpers.withMessage("Country required", alphaNum),
            },
            postal: {
              required: helpers.withMessage(
                "Postal/Zip code required",
                required
              ),
              alphaNum: helpers.withMessage(
                "Postal/Zip code required",
                alphaNum
              ),
            },
            phone: {
              required: helpers.withMessage(
                "Enter valid phone number",
                required
              ),
              numeric: helpers.withMessage("Enter valid phone number", numeric),
              phoneVal: helpers.withMessage(
                "Enter valid phone number",
                phoneVal
              ),
            },
            residential: {
              required: helpers.withMessage(
                "Select residential type",
                required
              ),
            }, // add radio button
            email: {
              required,
              email,
              mustBeLearnVue: helpers.withMessage(
                "This is a custom message",
                mustBeLearnVue
              ),
            }, // 716 868 3798
          },
          packOpt: {
            length: {
              decimal: helpers.withMessage(
                "Length must be atleast 1 inch",
                decimal
              ),
              minValue: helpers.withMessage(
                "Length must be atleast 1 inch",
                minValue(1)
              ),
            },
            width: {
              decimal: helpers.withMessage(
                "Length must be atleast 1 inch",
                decimal
              ),
              minValue: helpers.withMessage(
                "Width must be atleast 1 inch",
                minValue(1)
              ),
            },
            height: {
              decimal: helpers.withMessage(
                "Length must be atleast 1 inch",
                decimal
              ),
              minValue: helpers.withMessage(
                "Height must be atleast 1 inch",
                minValue(1)
              ),
            },
            wtPounds: {
              decimal: helpers.withMessage("Minimum weight required", decimal),
              minValue: helpers.withMessage(
                "Minimum weight required",
                minValue(1)
              ),
              required: helpers.withMessage(
                "Minimum weight required",
                required
              ),
            },
            wtOunces: {
              decimal: helpers.withMessage("Minimum weight required", decimal),
              minValue: helpers.withMessage(
                "Minimum weight required",
                minValue(1)
              ),
              required: helpers.withMessage(
                "Minimum weight required",
                required
              ),
            },
          },
          /*  email: {
            required,
            email,
            mustBeLearnVue: helpers.withMessage(
              "This is a custom message",
              mustBeLearnVue
            ),
          }, */
        },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password) },
        },
      };
    });

    const v$ = useValidate(rules, state);
    return {
      countries,
      residential,
      state,
      vSelect,
      v$,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.v$);
      this.v$.$validate();
      if (!this.v$.$error) {
        alert("form successfully submitted");
      } else {
        alert("form didnt pass validation");
      }
    },
  },
};
</script>

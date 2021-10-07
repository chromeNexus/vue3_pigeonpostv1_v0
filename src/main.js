import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import _ from "lodash";
const app = createApp(App);
const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = _.upperFirst(
    _.camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.use(createPinia()).use(router).mount("#app");

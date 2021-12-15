```js
// Options API :
const {
  createApp
} = Vue;
const App = {

  data() {
    return {

    }
  },
  methods: {
    submitData() {
      this.$refs.myinput.focus()
    }
  },
  mounted() {

  }
}
const app = createApp(App)
app.mount('#app')
```

```js
const {
  createApp,
  ref,
  onMounted,

} = Vue;
const App = {

  setup() {
    const myinput = ref(null)

    function submitData() {
      myinput.value.focus()
    }

    return {
      myinput,
      submitData
    }
  }
}
const app = createApp(App)
app.mount('#app')
```

```html
<script src="https://unpkg.com/vue@3.0.0-rc.11/dist/vue.global.prod.js"></script>

<div id="app">
  Vue 3 app
  <input ref="myinput" />
  <button @click="submitData">
  Submit
  </button>
</div>
```


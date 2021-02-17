Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el: "#app",
  data: {
    title: 'Todos',
    form: {
      id: '',
      body: '',
      updatedAt: ''
    },
    todos: '',
    editIndex: -1,
    createFlag: true
  },
  methods: {
    showModal() {
      this.createFlag = true;
      this.resetForm();
      this.$modal.show('todo-modal');
    },
    registerPerson() {
      const todo = Object.assign({}, this.form);

      axios
        .post('出力されたAPIゲートウェイのURL',
          {
            id: todo.id,
            body: todo.body,
            updatedAt: todo.updatedAt
          }
        )
        .then(response => this.todos.unshift(todo))
        .catch(function (error) {
          alert('todosデータの登録に失敗しましたっ！');
          console.log(error);
        });

      // this.todos.push(todo);
      this.$modal.hide('todo-modal');
      this.resetForm();

    },
    resetForm() {
      this.form.id = '';
      this.form.body = '';
      this.form.updatedAt = '';
    },
    deletePerson(todo) {
      const params = { id: todo.id };
      const id = todo.id;
      axios.request({
        method: 'delete',
        url: '出力されたAPIゲートウェイのURL/' + id,
        data: { id: todo.id }
      })
        .then(response => {
          const index = this.todos.indexOf(todo);
          this.todos.splice(index, 1);
          console.log('deleted successfully');
          console.log(id);
        })
        .catch(function (error) {
          alert('todosデータの削除に失敗しました');
          console.log(error);
        });
    },
    editPerson(todo) {
      this.createFlag = false,
        this.editIndex = this.todos.indexOf(todo);
      this.form = Object.assign({}, todo);
      axios.put()
      this.$modal.show('todo-modal');
    },
    updatePerson() {
      const id = this.form.id;
      console.log(id);
      axios
        .put('出力されたAPIゲートウェイのURL/' + id,
          {
            id: this.form.id,
            body: this.form.body,
            updatedAt: this.form.updatedAt
          }
        )
        .then(response => Object.assign(this.todos[this.editIndex], this.form))
        .catch(function (error) {
          alert('todosデータの更新に失敗しました');
          console.log(error);
        });
      this.$modal.hide('todo-modal');
    },
    cancel() {
      this.$modal.hide('todo-modal');
    }
  },
  mounted() {
    axios
      .get('出力されたAPIゲートウェイのURL')
      .then(response => (this.todos = response.data))
      .catch(function (error) {
        alert('todosデータの取得に失敗しました');
        console.log(error);
      });
  }
});
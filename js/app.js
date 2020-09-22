// 在这里, 编写你的vue代码
(function () {
  new Vue({
    el: '.todoapp',
    data: {
      todoName: '',
      todos: [],
      now: -1
    },
    //进入页面，尽快发送ajax请求，但是不能早于created
    created () {
      this.render()
    },
    methods: {
      //渲染页面发送ajax请求
      async render () {
        const res = await axios.get('http://localhost:3000/todos?_sort=id&_order=desc')
        this.todos = res.data
      },
      //添加一项todo
      async addTodo () {
        await axios.post('http://localhost:3000/todos', {
          todoName: this.todoName,
          state: false
        })
        this.render()
        this.todoName = ''
      },
      //删除todo
      async delTodo (id) {
        await axios.delete(`http://localhost:3000/todos/${id}`)
        this.render()
      },
      //点击前面的按钮，修改状态
      async changeSate (id, state) {
        await axios.patch(`http://localhost:3000/todos/${id}`, { state })
        this.render()
      },
      //展示修改框
      showInp (id) {
        this.now = id
      },
      //按enterr键，修改todoName
      async changeTodoName (id, todoName) {
        await axios.patch(`http://localhost:3000/todos/${id}`, { todoName })
        this.render()
        this.now = -1
      }
    },
    computed: {
      leftCount () {
        return this.todos.filter(item => !item.state).length
      },
      isShowFooter () {
        return this.todos.length > 0
      }
    }
  })
})()
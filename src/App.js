import { useState, useRef } from "react"; //Hooks
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';


function App() {
  // 変数を監視する
  const [todos, setTodos] = useState([
    // { id: 1, name: "Todo1", completed: false},
  ]);

  // useRef()で値を受け取る
  const todoNameRef = useRef();

   // タスクを追加する
  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return 
    setTodos((prevTodos) => {
      // 「...」→ スプレッド構文
      return [...prevTodos, { id: uuidv4(), name: name, completed: false}]
    });
    todoNameRef.current.value = null;
  }

  // チェックボックスのtoggleを変更
  const toggleTodo = (id) => {
    // スプレッド構文でtodosをnewTodosにコピーする　mutable immutableの考え
    const newTodos = [...todos];
    // find関数で(todo)にnewTodosを一つずついれていく。todo.id === idで一致するか確認
    const todo = newTodos.find((todo) => todo.id === id);
    // falseをtrueに反転
    todo.completed = !todo.completed;
    // setTodos関数でnewTodosを更新
    setTodos(newTodos);

  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef}/>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;

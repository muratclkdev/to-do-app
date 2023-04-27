import React, {useState} from 'react';
import '../styles/style.css';

function Todo() {
    const [filter, setFilter] = useState('all'); 
    const [selectAll, setSelectAll] = useState(false); 
    const [todo, setTodo] = useState('');  
    const [editingIndex, setEditingIndex] = useState(null); 
    const [todoList, setTodoList] = useState([]); 
    const [editingValue, setEditingValue] = useState('');


//kullanici enter tusuna bastiginda yeni todo eklenir
    const handleKeyPress = (event) => {
        if (todo !== "" && event.key === 'Enter') {
            addTodo();
        }
    };
//kullanici yeni todo eklemek icin butona bastiginda yeni todo eklenir
    const addTodo = () => {
        setTodoList([...todoList, {text: todo, completed: false}]);
        setTodo('');
    };
//kullanici todoyu silmek icin butona bastiginda todoyu siler
    const deleteTodo = (index) => {
        setTodoList(todoList.filter((_, i) => i !== index));
    };
//kullanici todoyu edit etmek icin butona bastiginda todoyu editlemesini saglar
    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingValue(filteredList()[index].text);
    };
//kullanici edit islemini bitirmek icin butona bastiginda edit islemini bitirir
    const stopEditing = () => {
        setEditingIndex(null);
        setEditingValue('');
    };
//kullanici todoyu edit etmek icin butona bastiginda todoyu editlemesini saglar
    const updateTodo = (index) => {
        const updatedList = [...todoList];
        updatedList[index].text = editingValue;
        setTodoList(updatedList);
        stopEditing();
    };
//kullanici todoyu tamamlamak icin butona bastiginda todoyu tamamlar
    const toggleCompleted = (index) => {
        const updatedList = [...todoList];
        updatedList[index].completed = !updatedList[index].completed;
        setTodoList(updatedList);
    };
//kullanici tamamlanmis todolari silmek icin butona bastiginda tamamlanmis todolari siler
    const clearCompleted = () => {
        setTodoList(todoList.filter((item) => !item.completed));
    };
//kullanici tamamlanmamis todolari saymak icin butona bastiginda tamamlanmamis todolari sayar
    const activeTodoCount = () => {
        return todoList.filter((item) => item.completed).length
    };
//kullanici listedeki todolari filtrelemek icin butona bastiginda todolari filtreler
    const filteredList = () => {
        switch (filter) {
            case 'active':
                return todoList.filter((item) => !item.completed);
            case 'completed':
                return todoList.filter((item) => item.completed);
            default:
                return todoList;
        }
    };



    const handleSelectAll = () => {
        if(todoList.length) {
            const updatedList = todoList.map((item) => ({
                ...item,
                completed: !selectAll,
            }));
            setTodoList(updatedList);
            setSelectAll(!selectAll);
        }
    };

    return (
        <div>
            <section className="todoapp">
                <header className="header">
                    <h1>TODOS</h1>

                    <input
                        className="new-todo"
                        property="newTodo"
                        placeholder="What needs to be done?"
                        autoFocus
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <label id="checkLabel"
                        for="toggleAll">

                    </label>
                    <input id="toggleAll"
                           style={{display: "flex"}}
                           type="checkbox"
                           checked={selectAll}
                           onChange={handleSelectAll}
                    />
                </header>

                <ul className="todo-list">
                    {filteredList().map((item, index) => (
                        <li className="listItem" key={index}>
                            {editingIndex === index ? (
                                <>

                                <input

                                    type="text"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    onBlur={stopEditing}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateTodo(index);
                                        }
                                    }}
                                    autoFocus
                                /></>
                            ) : (
                                <>
                                    <input
                                        id="myCheck"
                                        checked={item.completed}
                                        onChange={() => toggleCompleted(index)}
                                        type="checkbox"
                                        style={{marginRight: '10px'}}
                                    />
                                    <span
                                        style={{textDecoration: item.completed ? 'line-through' : 'none'}}
                                        onClick={() => startEditing(index)}
                                    >
                  {item.text}
                </span>
                                    <button
                                        className="destroy"
                                        mv-action="delete(todo)"
                                        onClick={() => deleteTodo(index)}
                                    ></button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodoCount()} items left</strong>
        </span>
                    <ul className="filters">
                        <li className="btn">
                            <button onClick={() => setFilter('all')}>All</button>
                            <button onClick={() => setFilter('active')}>Active</button>
                            <button onClick={() => setFilter('completed')}>Completed</button>
                        </li>
                    </ul>
                    <button className="clear-completed" onClick={clearCompleted}>
                        Clear completed
                    </button>
                </footer>
            </section>
        </div>
    );

};

export default Todo;
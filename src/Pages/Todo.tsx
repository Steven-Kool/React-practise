import TodoItem from '../components/TodoItem';
import ListPage from '../components/ListPage';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Button from '../components/Button';
import Alert from '../components/Alert';

interface Todos {
   id: number;
   name: string;
   statement: boolean;
}

interface AlertMessages {
   id: number;
   type: string;
}

const Todo = ({ description }: { description: string }) => {
   const [todoList, setTodoList] = useState<Todos[]>([]);
   const [todoInput, setTodoInput] = useState('');
   const [filter, setFilter] = useState('all');
   const [filteredArray, setFilteredArray] = useState(todoList);
   const [alertArray, setAlertArray] = useState<AlertMessages[]>([]);
   const [finishedTodo, setFinishedTodo] = useState<Todos[]>([]);
   const [todoNumber, setTodoNumber] = useState(todoList.length);
   const [finishedNumber, setFinishedNumber] = useState(finishedTodo.length);

   const animationDelay: number = 300;

   useEffect(() => {
      const getTodo = () => {
         const storedItems = localStorage.getItem('todoList');
         return storedItems ? JSON.parse(storedItems) : [];
      };

      const addItemWithDelay = async (getTodo: Todos[]) => {
         for (const item of getTodo) {
            setTodoList((prevtodo) => [...prevtodo, item]);

            await new Promise((resolve) => setTimeout(resolve, animationDelay));
         };
      };
      
      addItemWithDelay(getTodo());
   }, []);

   useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
   }, [todoList]);

   useEffect(() => {
      if (filter === 'complete') {
         setFilteredArray(todoList.filter((todo) => todo.statement == true))
      } else if (filter === 'incomplete') {
         setFilteredArray(todoList.filter((todo) => todo.statement == false))
      }
   }, [filter, todoList]);

   useEffect(() => {
      setTodoNumber(todoList.length);
      setFinishedNumber(finishedTodo.length);
   }, [todoList, finishedTodo]);

   const changeFinishOrNot = (id: number, finishOrNot: boolean) => {
      setTodoList((prevTodoList) =>
         prevTodoList.map((todo) =>
            todo.id === id ? { ...todo, statement: finishOrNot } : todo
         )
      );
   };

   const addNewTodo = () => {
      if (todoInput.trim() !== '') {
         const newTodo: Todos = {
            id: Date.now(),
            name: todoInput,
            statement: false,
         };
         
         setTodoList((prevTodo) => [...prevTodo, newTodo]);
         setTodoInput('');

         addAlert({ type: 'success' });

      } else {
         addAlert({ type: 'danger' });
      };
   };

   const removeAlert = ({ id }: { id: number }) => {
      setAlertArray((prevAlertArray) =>
         prevAlertArray.filter((alert) => alert.id !== id)
      );
   };


   const addAlert = ({ type }: { type: string }) => {
      const newAlert: AlertMessages = {
         id: Date.now(),
         type: type,
      };
      
      setAlertArray((prevAlert) => [newAlert, ...prevAlert]);

      // To remove alert
      setTimeout(() => {
         removeAlert({ id: newAlert.id })
      }, 3000);
   };

   const handleDeleteTodo = (id: number) => {
      const updatedTodo = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodo);

      addAlert({ type: 'warning' });
   };

   const changeArray = (id: number) => {
      const toMoveTodo = todoList.find((todo) => todo.id === id)

      if (toMoveTodo && toMoveTodo.statement === false) {
         setTodoList(prevTodo => prevTodo.filter((todo) => todo.id !== id));
         setFinishedTodo((prevTodo) => [...prevTodo, toMoveTodo]);

      } else if (toMoveTodo && toMoveTodo.statement === true) {
         setFinishedTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
         setTodoList((prevTodo) => [...prevTodo, toMoveTodo]);
      };
   };

   const changeTodoName = (id: number, newName: string): boolean => {
      if (newName.trim() !== '') {
         setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
               todo.id === id ? { ...todo, name: newName } : todo
            )
         );
         return true;

      } else {
         addAlert({ type: 'danger' });
         return false;
      };
   };

   const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedFilter = event.target.value;
      setFilter(selectedFilter);
   };

   return (
      <ListPage title={description}>
         <div className='w-full flex justify-center items-center m-0'>
            <div className='max-w-2/3 min-w-2/3 rounded-lg p-4 flex flex-col justify-center items-stretch bg-slate-200'>
               <div className='container w-full h-10 flex flex-row justify-around items-center'>
                  <div className='text-slate-700 text-sm'>
                     Todolist Number: {todoNumber}
                  </div>

                  <div className='text-slate-700 text-sm'>
                     Finished Tasks: {finishedNumber}
                  </div>
               </div>

               <div className='mb-5 flex justify-between items-center'>

                  <div className='mr-3 flex justify-between items-center basis-10/12'>
                     <Button innerText="Add Todo" click={addNewTodo} size={'bg-emerald-900 hover:bg-emerald-800 rounded-lg py-3 px-3 text-white text-2xl'} />

                     <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} placeholder='Add Todo here...'
                        className=" flex-1 ml-3 p-3 rounded shadow-inset text-black text-2xl font-medium placeholder:text-slate-500 outline-0 placeholder:text-xl" />
                  </div>

                  <div className='flex justify-center items-center basis-2/12'>
                     <select className='container p-2 rounded text-start text-xl' value={filter} onChange={handleFilter}>
                        <option value="all" selected>All</option>
                        <option value="complete">Complete</option>
                        <option value="incomplete">Incomplete</option>
                     </select>
                  </div>

               </div>

               { todoList.length > 0 ? (
                  // If the filter is NOT equal to 'all', render the filtered todo items.
                  filter === 'all' ? todoList.map((todo) => (
                     <TodoItem
                        key={todo.id}
                        todoName={todo.name}
                        finishOrNot={todo.statement}
                        date={format(new Date(todo.id), 'MMMM dd, yyyy HH:mm:ss')}
                        Delete={() => handleDeleteTodo(todo.id)}
                        change={(newName: string) => changeTodoName(todo.id, newName)}
                        changeFinishOrNot={(situation: boolean) => changeFinishOrNot(todo.id, situation)}
                        changeArray={() => changeArray(todo.id)}
                     />
                  )) : (
                     filteredArray.map((todo) => (
                        <TodoItem
                           key={todo.id}
                           todoName={todo.name}
                           finishOrNot={todo.statement}
                           date={format(new Date(todo.id), 'MMMM dd, yyyy HH:mm:ss')}
                           Delete={() => handleDeleteTodo(todo.id)}
                           change={(newName: string) => changeTodoName(todo.id, newName)}
                           changeFinishOrNot={(situation: boolean) => changeFinishOrNot(todo.id, situation)}
                           changeArray={() => changeArray(todo.id)}
                        />
                     ))
                  )) : (
                     <div className='flex justify-center items-center'>
                        <div className='rounded p-2 bg-black text-white text-2xl font-medium flex justify-center items-center' style={{width: '200px'}}>
                           No Todo
                        </div>
                     </div>
                  )
               }

               { finishedTodo.length > 0 &&
                  <div className='container rounded-sm bg-slate-500 w-full flex flex-col justify-start items-center'>
                     
                  </div>
               }

               <div className='fixed right-3 bottom-3'>
                  {
                     alertArray.map((alert) => (
                        <Alert key={alert.id}
                           type={alert.type}
                        />
                     ))
                  }
               </div>

            </div>
         </div>
      </ListPage>
   );
};

export default Todo;

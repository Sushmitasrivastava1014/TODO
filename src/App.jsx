import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  

  const saveToLS =()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  useEffect(()=>{
    let data=localStorage.getItem("todos");
    if(data){
      setTodos(JSON.parse(data));
    }
  },[])

  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    saveToLS();
  }
  const handleEdit = (e,id) => {
    let t=todos.filter((i)=>i.id===id);
    setTodo(t[0].todo);
    let newTodos=todos.filter((i)=>i.id!==id);
    setTodos(newTodos);
    saveToLS();
    
  }
  const handleDelete = (e,id) => {
    let newTodos=[...todos];
    newTodos=todos.filter((item)=>item.id!==id);
    setTodos(newTodos);
    saveToLS();
    
  }
  const handleChange = (e) => {
   setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
  let id=e.target.name;
  let index=todos.findIndex((item)=>item.id===id);
  let newTodos=[...todos];
  newTodos[index].isCompleted=!newTodos[index].isCompleted;
  setTodos(newTodos);
  }
  const toggleFinished=()=>{
    setShowFinished(!showFinished);
    
  }
  
  return (
    <>
    <div>
    <Navbar/>
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] text-violet-900 w-1/2 font-mono'>
      <h1 className="font-bold text-3xl text-center">iTask-Manage your todos at one place</h1>
        <div className='addTodo my-5 py-2 flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>Add a TODO</h2>
          <div className="flex mx-2 gap-3">
          <input type='text' onChange={handleChange} value={todo} placeholder='Enter your TODO here' className='w-full rounded-lg py-2 px-5' />
          <button onClick={handleAdd} disabled={todo.length<=3} className=' px-4 bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950  py-1 text-sm font-bold text-white rounded-md mx-0 font-bold-700'><RiAddCircleFill /></button>
          </div>
        </div>
        <div cLassName="toggleButton my-9">
        <label class="inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" onChange={toggleFinished} checked={showFinished}/>
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span class="ms-3 text-sm font-medium text-violet-900 dark:text-gray-300">Show Finished TODOs</span>
        </label>
        </div>
        <div className="h-[1px] bg-violet-900 opacity-15 w-1/2 mx-auto my-5"></div>
    
        
        <h2 className='text-lg font-bold my-8'>Your Todo:</h2>
        <div className='todos'>
          {todos.length===0 && <div className="italic m-4">No todos to show</div>}
          {todos.map((item)=>{
            return((showFinished || !item.isCompleted) &&<div key={item.id} className='todo flex my-2 justify-between'>
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="mx-0"/>
              <div className={item.isCompleted?"line-through":"" }>{item.todo}</div>
              </div>
              <div className='buttons '>
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800  hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 font-bold-700'><FaEdit/></button>
                <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800  hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 font-bold-700'><MdDelete /></button>
              </div>
              </div>)})}
          </div>
          
          
          

        </div>
        </div>
        
      
    </>
  )
}

export default App

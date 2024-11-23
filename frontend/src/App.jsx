import { Route, Routes } from "react-router-dom"
import LogIn from "./Components/Login"
import Registration from "./Components/Registration"
import Home from "./Components/Home"
import Table from './Components/table';
import View from './Components/view';
import Create from "./Components/create";
import Edit from "./Components/edit";
import DeleteBlog from "./Components/delete";
import Logout from "./Components/Logout";



const App = () => {
  return (
    <div>
<Routes>

<Route path="/manage" element={<Table/>}/>
<Route path="/" element={<Home/>}  />
<Route path="/create" element={<Create/>} />
    <Route path="/login" element={<LogIn/>} />
    <Route path="/Registration" element={<Registration/>}/>
    <Route path="/view/:id" element={<View/>}/>
    <Route path="/edit/:id" element={<Edit/>}/>
    <Route path="/logout" element={<Logout/>} />
</Routes>
    </div>
   
  )
}

export default App
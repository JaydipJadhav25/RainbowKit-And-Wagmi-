import { useState } from "react"
import {toast} from "sonner"
import { useAuth } from "./context/AuthContext";

function CompleteProfile() {

  const[name , setName] = useState("");
  const[role , setRole] = useState("");


  //use authContext
  const {completeProfile } = useAuth();



  async function handle(){
    try {
      console.log(name , role);
      const response = await completeProfile(name, role);
      console.log("response : "  , response);
      toast.success("done!") 
    } catch (error) {
      console.log("error : " , error);
      toast.error("Error!")
    }
  }

   



  return (
    <div>
       <h1>CompleteProfile</h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          handle();
          
        }}>
           <label htmlFor="">Name :</label>
           <input type="text" required onChange={(e)=>{
            setName(e.target.value);
           }}/>
           <hr />
           <label htmlFor="">Role</label>
           <select name="" id="" onChange={(e)=>{
            setRole(e.target.value);
           }}>
             <option  value="">Select </option>
             <option  value="teacher">Teacher</option>
             <option value="authority">authority</option>
             <option value="examCenter">examCenter</option>
           </select>
           <hr />
            <input type="submit" />
        </form>
    </div>
  )
}

export default CompleteProfile
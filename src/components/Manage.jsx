import axios from "axios";
import { useEffect, useState } from "react";
function Manage() {
    const [users,setUser]= useState('')
    const [select,setSelect]=useState('')
    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/getAll')
        .then(res=>setUser(res.data))
    },[])
    const handelEdit =async (id)=>{
       await axios.post('http://127.0.0.1:5000/getOneUser',{'id':id})
       .then(res=>
        {
            setSelect(res.data)
            setName(res.data.name)
            setPass(res.data.pass)
        }
       )
    }
    const handelSubmit =async (e)=>{
        e.preventDefault()
        await axios.post('http://127.0.0.1:5000/update',{
           'name':name,
           'pass':pass,
           'id':select.id
        })
    }
    return ( 
     <div>
        {select?
        <form onSubmit={handelSubmit}>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} />
        <input type="text" value={pass} onChange={e=>setPass(e.target.value)} />
        <button >Update</button>
        </form>
    :''}
        {users ? 
        users.map((user,index)=>{
            return (
            <div key={index}>
                <h1>{user.name}</h1>
                <h2>{user.password}</h2>
                <img style={{'width':'120px','height':'120px'}} src={`http://127.0.0.1:5000/static/uploads/${user.avatar}`} />
                <button onClick={()=>handelEdit(user.id)}>Edit</button>
            </div>
            )
        })
        :''}
     </div>
     );
}

export default Manage;
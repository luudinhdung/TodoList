import React, { useState } from 'react';
import axios from 'axios';
function Home() {
  const [file, setFile] = useState(null);
  const [avatar,setAvatar] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post('http://127.0.0.1:5000/upload', formData)
      .then(res=>setAvatar(res.data))
      ;
      console.log('Upload successful');
    } catch (error) {
      console.error('Upload failed', error);
    }
  };
  const handelSubmit=async (e)=>{
    e.preventDefault()
    await axios.post('http://127.0.0.1:5000/login',{
      name,password,avatar
    })
    .then(res=>console.log(res.data))
  }
  return (
    <div>
<form onSubmit={handelSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" onChange={e=>setName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="text" className="form-control" onChange={e=>setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Home;
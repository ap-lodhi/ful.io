import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import axios from "axios"
export const Editor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blog, setBlog] =useState("")
    const [arr,setArr]=useState([])
    const editor = useRef(null);
    const handleSave=()=>{
     const data={
        text:content
     }
    //  axios.post("  http://localhost:8080/posts",data).then(res=>{
    //         setBlog(res.data)
    //  })
    fetch('http://localhost:8080/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json"
        }
      }).then((res) => res.json())
        .then((res) => {
         setBlog(res.data)
          })
    }
    useEffect(()=>{
        axios.get(' http://localhost:8080/posts').then(res=>{
            
            setArr(res.data)
        })
        
    },[])
    console.log(arr)
  return (
    <div style={{width:"80%",margin:"auto"}}>
            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder='Title' style={{ width: "1050px", fontSize: "40px", marginBottom: "10px", border: "none", padding: "20px" }} />
            <JoditEditor value={content} ref={editor} onChange={(text) => setContent(text)} />

          <button  onClick={handleSave}>save</button>
          {
            arr?.map((el)=>(
                <div>
                    <p>{el.text}</p>
                </div>
            ))
          }
    </div>
  )
}

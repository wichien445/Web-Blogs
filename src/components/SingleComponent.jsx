import React from 'react'
import axios from 'axios'
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'

function SingleComponent() {
  const [blog,setBlog] = useState('');

  let params = useParams();

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
    .then(response=>{
      setBlog(response.data)
    })
    .catch(err=>alert(err))
  },[])

  useEffect(()=>{
    console.log("Params", params)
    console.log("Params", params.slug)
  },[params])

  return (
    <div className='container p-5'>
      <NavbarComponent/>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p className='text-muted'>ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
    </div>
  )
}

export default SingleComponent
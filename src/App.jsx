import NavbarComponent from './components/NavbarComponent';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUser } from '../services/authorize';

function App() {

  const [blogs,setBlogs] = useState([])

  const fetchData =()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  const deleteBlog=(slug)=>{
    Swal.fire("Delete!","ลบบทความเรียบร้อย","success")
    axios.delete(`${import.meta.env.VITE_APP_API}/blog/${slug}`)
    .then(response=>{
      Swal.fire("Delete!",response.data.message,"success")
      fetchData()
    })
    .catch(err=>console.log(err))
  }

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไหม?",
      icon: "warning",
      showCancelButton:true
    }).then((result)=>{
      //กด OK
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  return (
    <div className="container p-5">
      <NavbarComponent/>
      {blogs.map((blog,index)=>(
        <div className='row' key={index} style={{borderBottom:'1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 250)}</p>
            <p className='text-muted'>ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            { getUser() && (
              <div>
                <Link className='btn btn-outline-success' to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                <button className='btn btn-outline-danger' onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

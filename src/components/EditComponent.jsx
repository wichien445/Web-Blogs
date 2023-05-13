import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditComponent() {
    const [state, setState] = useState({
        title:"",
        content:"",
        author:"",
        slug:""
    })

    let params = useParams();
    
    const {title, content, author, slug} = state;

    //set value state
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }
    
    //ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
        .then(response=>{
          const {title, content, author, slug} = response.data
          setState({...state,title, content, author, slug})
        })
        .catch(err=>alert(err))
    },[])

    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
            <div className='form-group'>
                <label>ชื่อบทความ</label>
                <input type="text" className='form-control' value={title} onChange={inputValue("title")}/>
            </div>
            <div className='form-group'>
                <label>รายละเอียด</label>
                <textarea name="" id="" cols="30" rows="10" className='form-control' value={content} onChange={inputValue("content")}></textarea>
            </div>
            <div className='form-group'>
                <label>ผู้แต่ง</label>
                <input type="text" className='form-control' value={author} onChange={inputValue("author")}/>
            </div>
            <br />
            <input type="submit" value="อัพเดต" className='btn btn-primary'/>
        </form>
    )

    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL = ", `${import.meta.env.VITE_APP_API}`)

        axios.put(`${import.meta.env.VITE_APP_API}/blog/${slug}`,{title, content, author})
        .then(response=>{
            Swal.fire("แจ้งเตือน","อัพเดตข้อมูลบทความเรียบร้อย","success")
            const {title, content, author, slug} = response.data
            setState({...state,title, content, author, slug})
        })
        .catch(err=>{
            Swal.fire("แจ้งเตือน",err.response.data.error,"error")
        })
    }
    return (
    <div className='container p-5'>
        <NavbarComponent/>
        <h1>แก้ไขบทความ</h1>
        {showUpdateForm()}
    </div>
  )
}

export default EditComponent
import React from 'react'
import { useState } from 'react'
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getUser } from '../../services/authorize';

function FormComnent() {
    const [state, setState] = useState({
        title:"",
        content:"",
        author:getUser()
    })
    const {title, content, author} = state;

    //set value state
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title, content, author})
        console.log("API URL = ", `${import.meta.env.VITE_APP_API}`)

        axios.post(`${import.meta.env.VITE_APP_API}/create`,{title, content, author})
        .then(response=>{
            Swal.fire("แจ้งเตือน","บันทึกข้อมูลบทความเรียบร้อย","success")
        })
        .catch(err=>{
            Swal.fire("แจ้งเตือน",err.response.data.error,"error")
        })
    }
    return (
    <div className='container p-5'>
        <NavbarComponent/>
        <h1>เขียนบทความ</h1>
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
            <input type="submit" value="บันทึก" className='btn btn-primary'/>
        </form>
    </div>
  )
}

export default FormComnent
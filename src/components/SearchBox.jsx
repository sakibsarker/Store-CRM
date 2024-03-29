import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import {useParams,useNavigate} from 'react-router-dom'

const SearchBox = () => {

    const navigate=useNavigate();
    const {keyword:urlKeyword}=useParams();
    const [keyword,setKeyword]=useState(urlKeyword||'');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            setKeyword('');
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
        }

    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        >
        </Form.Control>
        <Button type='submit' style={{
          backgroundColor: '#F4F4F4', // Set background color
          color: 'black', // Set text color
          border: '1px solid #F4F4F4', // Set border color if needed
        }} className='p-2 mx-2'>Search</Button>
        
       
    </Form>

  )
}

export default SearchBox
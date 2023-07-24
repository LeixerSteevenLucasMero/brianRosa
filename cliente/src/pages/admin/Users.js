import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Layout';
import axios from 'axios'
import { Table } from 'antd'
const  Users = () => {
    const [users, setUsers] =useState([])

    //getuser
    const getUsers = async() => {
        try {
            const res = await axios.get ('/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }) 
            if (res.data.success) {
                setUsers(res.data.data)
            }  
            // } else {
            //     message.error(res.data.success)
            // } 
        } catch (error) {
            console.log(error)
           
        }
    };
    

    useEffect(() => {
        getUsers()
    },[])

    //antd 

    const columns = [
        {
            title:'Nombre',
            dataIndex:'name',


        },
        {
            title:'Correo Electronico',
            dataIndex:'email',


        },
        {
            title:'Doctor',
            dataIndex:'isDoctor',
            render: (text, record) => (
               <span>{record.isDoctor ? 'Si'  : 'No'}</span>
            ),


        },
        {
            title:'Acciones',
            dataIndex:'actions',
            render : (text, record) =>(
                <div className='d-flex'>
                    <button className="btn btn-danger" > Block</button>

                </div>
            ),


        },

    ];
       
    
  return (
      <Layout>
          <h1 className=' text-center ms-2'>
              Lista de usuarios
          </h1>
          <Table columns={columns} dataSource= {users}/>

      </Layout>
  )
}

export default Users
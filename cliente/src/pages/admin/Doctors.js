import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout'
import axios from 'axios'
import { Button, message, Table } from 'antd';
const Doctors = () => {
    const [doctors, setDoctors] = useState([])
    const getDoctors = async () => {

        try {
            const res = await axios.get('/admin/getAllDoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
          
        } catch (error) {
            console.log(error)

        }
    };
    //handle acount 

    const handleAccountStatus= async (record, status) => {
        try {
            const res = await axios.post("/admin/changeAccountStatus", 
            {doctorId: record._id, userId: record.userId ,status: status },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            }
            )
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
            
           

        } catch (error) {
            console.log(error)
            message.error ('Algo salio mal')

        }

    }
    useEffect(() => {
        getDoctors()
    }, [])

    const columns =[
        {
            title:'Nombre',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            ),

        },
        {
            title: 'Estado',
            dataIndex: 'status',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',

        },
        {
            title: 'Acción',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" ? (
                        <Button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>Aprobar</Button>
                    ) : (
                    <Button className="btn btn-danger">Rechazar</Button>
                    )}
                </div>
            ),

        },
    ]


  return (
      <Layout>
          <h1 className=' text-center ms-2'>
              Lista doctor
          </h1>
          <Table columns={columns} dataSource={doctors} />

      </Layout>
  )
}

export default Doctors
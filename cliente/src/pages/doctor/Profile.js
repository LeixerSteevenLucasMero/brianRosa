import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout'
import axios from 'axios'
import { useParams, useNavigate } from  'react-router-dom'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import moment  from 'moment';


const Profile = () => {
    const {user } = useSelector(state => state.user)
    const dispatch = useDispatch ()
    const navigate = useNavigate()
    const [doctor , setDoctor] = useState(null)
    const params = useParams ()

    // doctor update

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/doctor/updateProfile", 
            { ...values, userId: user._id, 
                timings:[
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm")
                ]}, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Algo salio mal')

        }
    };
    // get doctor detalles

    const getDoctorInfo = async() => {
        try {
            const res = await axios.post('/doctor/getDoctorInfo',
            { userId: params.id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success){ 
                setDoctor(res.data.data)

            }
        } catch (error) {
            console.log(error)
            
        }

    }
    useEffect(() => {
        getDoctorInfo();
    }, [])

  return ( 
    <Layout>
       <h1>Perfil</h1>
       {doctor && (
              <Form 
              layout="vertical"
               onFinish={handleFinish}
                className="m-3"
               initialValues={{
                ...doctor,
                timings:[
                    moment(doctor.timings[0],'HH:mm'),
                    moment(doctor.timings[1], 'HH:mm')
                ]
               }}>
                  <h4 className="" >Detalles del personal : </h4>
                  <Row gutter={20}>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="Nombres" name="firstName" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir nombre">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="Apellido" name="lastName" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir apellidos">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="Telefono" name="phone" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir telefono">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="Correo Electronico" name="email" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir correo Electronico">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="Sitio Web" name="website" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir sitio web">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>

                          <Form.Item label="Dirección" name="address" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir dirección">
                              </Input>
                          </Form.Item>
                      </Col>
                  </Row>
                  <h4 className="" >Detalles de Profesion : </h4>
                  <Row gutter={20}>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="specialization" name="specialization" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir specialization">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="experience" name="experience" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir experience">
                              </Input>
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                          <Form.Item label="feesPerCunsaltation" name="feesPerCunsaltation" required rules={[{ required: true }]}>
                              <Input type="text" placeholder="Escribir feesPerCunsaltation">
                              </Input>
                          </Form.Item>
                      </Col>
                      {<Col xs={24} md={24} lg={8}>
                          <Form.Item label="timings" name="timings" required>
                              <TimePicker.RangePicker format="HH:mm" />
                          </Form.Item>
                      </Col> }
                      <Col xs={24} md={24} lg={8}></Col>
                      <Col xs={24} md={24} lg={8}>
                          <button className="btn btn-primary form-btn" type="submit">Guardar</button>

                      </Col>

                  </Row>

              </Form>
       )}
        </Layout>
  )
}

export default Profile
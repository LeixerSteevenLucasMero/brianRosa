
import React from 'react'
import Layout from '../Components/Layout'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'


const ApplyDoctor = () => {
    const {user}=  useSelector(state => state.user)
    const dispatch = useDispatch () 
    const navigate  = useNavigate()
    const handleFinish =async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/apply-doctor', {...values, userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem ('token')}`
                }

            })
            dispatch(hideLoading())
            if (res.data.success){
                message.success(res.data.message)
                navigate('/')
            } else { 
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Algo salio mal')
            
        }
    }
    return (
        <Layout>
            <h1 className="text-center"> Doctor </h1>
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="timings" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className="btn btn-primary form-btn" type="submit">Guardar</button>

                    </Col>

                </Row>





            </Form>
        </Layout>
    )
}

export default ApplyDoctor
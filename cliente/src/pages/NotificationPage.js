import React from 'react'
import Layout from './../Components/Layout'
import { message, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    // handle read notificacion 
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/get-all-notification', {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error("Algo salio mal")

        }
    };

    // eliminar notificacion 
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            console.log(error)
            message.error("Algo salio mal en las notificaciones")
        }
    };
    return (
        <Layout>
            <h4 className="p-3 text-center">Notificaciones</h4>
            <Tabs>
                <Tabs.TabPane tab="No leidas" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" onClick={handleMarkAllRead}>
                            Marcar todos como leidos
                        </h4>

                    </div>
                    {
                        user?.notifcation.map(notificationMgs => (
                            <div className="card"

                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-text"
                                    onClick={() => navigate(notificationMgs.onClickPath)}>
                                    {notificationMgs.message}

                                </div>

                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Leidas" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary "
                            style={{ cursor: 'pointer' }}
                            onClick={handleDeleteAllRead}>
                            Eliminar notificaciones leidas
                        </h4>

                    </div>
                    {
                        user?.seennotification.map(notificationMgs => (
                            <div className="card"

                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-text"
                                    onClick={() => navigate(notificationMgs.onClickPath)}>
                                    {notificationMgs.message}

                                </div>

                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>

    )
}

export default NotificationPage
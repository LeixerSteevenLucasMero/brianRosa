import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from './../../Components/Layout'
import '../../Style/userslist.css';
import { Table, Button, Form, Modal, Dropdown,Breadcrumb  } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showActions, setShowActions] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [isAdminFilter, setIsAdminFilter] = useState('');
    const [isDoctorFilter, setIsDoctorFilter] = useState('');
    const [blockedFilter, setBlockedFilter] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);


    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;





    useEffect(() => {
        // Llamar a la API para obtener la lista de usuarios cuando cambie el filtro de nombre o correo electrónico
        getUsers();
        setShowActions(new Array(users.length).fill(false));

        // Calcular el total de reservas solo si filteredUsers tiene valores

    }, [nameFilter, emailFilter, isAdminFilter, isDoctorFilter, blockedFilter]);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        isDoctor: false,
        blocked: false,
        // Agrega aquí los otros campos del nuevo usuario si es necesario
    });
    const handleAddModalClose = () => {
        // Cerrar el formulario emergente de agregar usuario
        setShowAddModal(false);
        // Limpiar los campos del nuevo usuario
        setNewUser({
            name: '',
            email: '',
            password: '',
            isAdmin: false,
            isDoctor: false,
            blocked: false,
            // Agrega aquí los otros campos del nuevo usuario si es necesario
        });
    };
    const handleAddModalSubmit = async () => {
        // Enviar la solicitud para agregar el nuevo usuario al servidor
        try {
            await axios.post('/user/users', {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password, // Enviar la contraseña sin encriptar al servidor
                isAdmin: newUser.isAdmin,
                isDoctor: newUser.isDoctor,
                blocked: newUser.blocked,
                // Agrega aquí los otros campos del nuevo usuario si es necesario
            });

            // Actualizar el estado de usuarios para reflejar los cambios
            setUsers([...users, newUser]);

            // Cerrar el formulario emergente de agregar usuario
            setShowAddModal(false);
        } catch (error) {
            console.error('Error al agregar el usuario', error);
        }
    };



    const getUsers = async () => {
        try {
            const response = await axios.get('/user/users', {
                params: {
                    name: nameFilter,
                    email: emailFilter,
                    isAdmin: isAdminFilter === '' ? '' : isAdminFilter === 'true',
                    isDoctor: isDoctorFilter === '' ? '' : isDoctorFilter === 'true',
                    blocked: blockedFilter === '' ? '' : blockedFilter === 'true',
                },
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de usuarios', error);
        }
    };
    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
    };

    const handleEditUser = (user) => {
        // Mostrar el formulario emergente de edición con los valores actuales del usuario
        setEditedUser(user);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        // Cerrar el formulario emergente de edición
        setShowEditModal(false);
    };
    // ... (resto del código)

    const handleEditModalSubmit = async () => {
        // Enviar la solicitud de actualización al servidor
        try {
            const updatedUserData = {
                isAdmin: editedUser.isAdmin,
                isDoctor: editedUser.isDoctor,
                blocked: editedUser.blocked,
                name: editedUser.name,
                email: editedUser.email,
                password: editedUser.password,
                // Agrega aquí los otros parámetros del usuario que deseas modificar
            };



            await axios.put(`/user/users/${editedUser._id}`, updatedUserData);

            // Actualizar el estado de usuarios para reflejar los cambios
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === editedUser._id ? editedUser : user))
            );

            // Cerrar el formulario emergente de edición
            setShowEditModal(false);

            // Mostrar notificación de éxito
            toast.success('Usuario editado correctamente', {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (error) {
            console.error('Error al editar el usuario', error);

            // Mostrar notificación de error
            toast.error('Error al editar el usuario', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };




    // ... (resto del código)


    const handleDeleteUser = async (_id) => {
        try {
            console.log('ID a eliminar:', _id);
            await axios.delete(`/user/users/${_id}`);
            // Filtrar los usuarios eliminados y actualizar el estado
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
            console.log('Usuario eliminado con ID:', _id);
        } catch (error) {
            console.error('Error al eliminar el usuario', _id, error);
        }
    };

    const handleBlockUser = async (_id, blocked) => {
        try {
            await axios.put(`/user/admin/blockUser/${_id}`, {}, {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            // Actualizar el estado de usuarios para reflejar los cambios
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === _id ? { ...user, blocked: !blocked } : user))
            );
        } catch (error) {
            console.error('Error al bloquear/desbloquear el usuario', error);
        }
    };

    // Lógica de filtrado y paginación
    const filteredUsers = useMemo(() => {
        let tempUsers = [...users];
        if (nameFilter) {
            tempUsers = tempUsers.filter(user => user.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        if (emailFilter) {
            tempUsers = tempUsers.filter(user => user.email.toLowerCase().includes(emailFilter.toLowerCase()));
        }
        if (isAdminFilter !== '') {
            tempUsers = tempUsers.filter(user => user.isAdmin === (isAdminFilter === 'true'));
        }
        if (isDoctorFilter !== '') {
            tempUsers = tempUsers.filter(user => user.isDoctor === (isDoctorFilter === 'true'));
        }
        if (blockedFilter !== '') {
            tempUsers = tempUsers.filter(user => user.blocked === (blockedFilter === 'true'));
        }
        return tempUsers;
    }, [users, nameFilter, emailFilter, isAdminFilter, isDoctorFilter, blockedFilter]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const toggleActions = (userId) => {
        if (activeMenu === userId) {
            // Si el menú estaba abierto, lo cerramos
            setActiveMenu(null);
        } else {
            // Si el menú estaba cerrado, lo abrimos
            setActiveMenu(userId);
        }
    };




    return (
        <Layout>
             <Breadcrumb>
        <Breadcrumb.Item href="/home">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Lista de usuarios</Breadcrumb.Item>
      </Breadcrumb>
            <h1 className="title-usuario">Lista de usuarios</h1>
            <Table striped bordered hover>
                <thead>
                    <Button variant="primary" className="add-user-button" onClick={() => setShowAddModal(true)}>
                        Agregar Usuario
                    </Button>

                    <tr>

                        <th>
                            <Form.Control
                                type="text"
                                placeholder="Filtrar por nombre..."
                                className="mb-3"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                            />
                        </th>
                        
                        <th>
                            <Form.Control
                                type="text"
                                placeholder="Filtrar por correo..."
                                className="mb-3"
                                value={emailFilter}
                                onChange={(e) => setEmailFilter(e.target.value)}
                            />
                        </th>
                        <th>
                            <Form.Control
                                as="select"
                                className="mb-3"
                                value={isAdminFilter}
                                onChange={(e) => setIsAdminFilter(e.target.value)}
                            >
                                <option value="">Filtrar por rol de admin</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </Form.Control>
                        </th>
                        <th>
                            <Form.Control
                                as="select"
                                className="mb-3"
                                value={isDoctorFilter}
                                onChange={(e) => setIsDoctorFilter(e.target.value)}
                            >
                                <option value="">Filtrar por rol doctor</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </Form.Control>
                        </th>
                        <th>
                            <Form.Control
                                as="select"
                                className="mb-3"
                                value={blockedFilter}
                                onChange={(e) => setBlockedFilter(e.target.value)}
                            >
                                <option value="">Filtrar por bloqueo</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </Form.Control>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Rol Administrador</th>
                        <th>Rol Doctor</th>
                        <th>Bloqueado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "Si" : "No"}</td>
                            <td>{user.isDoctor ? "Si" : "No"}</td>
                            <td>{user.blocked ? "SI" : "No"}</td>
                            <td>

                                <Dropdown.Toggle
                                    as={FaCog}
                                    id={`user-dropdown-${user._id}`}
                                    className="config-icon"
                                    onClick={() => toggleActions(user._id)}
                                    // Agrega el atributo show para controlar la visibilidad del menú
                                    show={activeMenu === user._id}
                                />
                                <Dropdown.Menu show={activeMenu === user._id}>
                                    {/* Opciones del desplegable */}
                                    <Dropdown.Item onClick={() => { handleEditUser(user); toggleActions(user._id); }}>Editar</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleDeleteUser(user._id); toggleActions(user._id); }}>Eliminar</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleBlockUser(user._id, user.blocked); toggleActions(user._id); }}>
                                        {user.blocked ? "Desbloquear" : "Bloquear"}
                                    </Dropdown.Item>
                                </Dropdown.Menu>

                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6" className="pagination">
                            {/* Usa enlaces de texto en lugar de botones */}
                            {currentPage > 1 && (
                                <span onClick={goToPreviousPage} className="pagination-link">
                                    Anterior
                                </span>
                            )}
                            <span>Página {currentPage} de {totalPages}</span>
                            {/* Cambia filteredUsers.length por currentUsers.length */}
                            {currentPage < totalPages && currentUsers.length > 0 && (
                                <span onClick={goToNextPage} className="pagination-link">
                                    Siguiente
                                </span>
                            )}
                        </td>
                    </tr>
                </tfoot>


                {/* Formulario emergente para agregar usuario */}
                <Modal show={showAddModal} onHide={handleAddModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Es Administrador"
                                    checked={newUser.isAdmin}
                                    onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
                                />
                            </Form.Group>

                            <Form.Group controlId="isDoctor">
                                <Form.Check
                                    type="checkbox"
                                    label="Es Doctor"
                                    checked={newUser.isDoctor}
                                    onChange={(e) => setNewUser({ ...newUser, isDoctor: e.target.checked })}
                                />
                            </Form.Group>

                            <Form.Group controlId="blocked">
                                <Form.Check
                                    type="checkbox"
                                    label="Bloqueado"
                                    checked={newUser.blocked}
                                    onChange={(e) => setNewUser({ ...newUser, blocked: e.target.checked })}
                                />
                            </Form.Group>
                            {/* Agrega aquí los otros campos del formulario para el nuevo usuario si es necesario */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddModalClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleAddModalSubmit}>
                            Agregar Usuario
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div></div>
            </Table>
            <div>

            </div>
            {/* Formulario emergente de edición */}
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={editedUser.password}
                                onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="isAdmin">
                            <Form.Label>Cambiar rol de usuario</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Es Administrador"
                                checked={editedUser.isAdmin}
                                onChange={(e) => setEditedUser({ ...editedUser, isAdmin: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="isDoctor">
                            <Form.Check
                                type="checkbox"
                                label="Es Doctor"
                                checked={editedUser.isDoctor}
                                onChange={(e) => setEditedUser({ ...editedUser, isDoctor: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="blocked">
                            <Form.Check
                                type="checkbox"
                                label="Bloqueado"
                                checked={editedUser.blocked}
                                onChange={(e) => setEditedUser({ ...editedUser, blocked: e.target.checked })}
                            />
                        </Form.Group>
                        {/* Agrega aquí los otros campos del formulario para modificar los otros parámetros del usuario */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleEditModalSubmit}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};
export default UserTable;

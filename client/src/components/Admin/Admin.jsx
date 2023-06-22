import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import AddUserModal from './Modals/AddUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';
import EditUserModal from './Modals/EditUserModal';
import { useUsers } from './../../hooks/useUsers';
import './Admin.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlus, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaSearch } from 'react-icons/fa';

const Admin = () => {
    const { users, fetchUsers, isLoading, error, updateUser, deleteUser, addUser } = useUsers();
    const [newUser, setNewUser] = useState({name: '', username: '', email: '', password: '', role: ''});
    const [addModalShow, setAddModalShow] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [editModalShow, setEditModalShow] = useState(false);

  
    // Ajoutez un nouvel état pour les utilisateurs filtrés
    const [filteredUsers, setFilteredUsers] = useState([]);
    

    function sortCaret(order) {
        if (!order) return (<></>);
        else if (order === 'asc') return (<>&nbsp;<FontAwesomeIcon icon={faArrowUp} /></>);
        else if (order === 'desc') return (<>&nbsp;<FontAwesomeIcon icon={faArrowDown} /></>);
        return null;
      }
    
    const defaultSorted = [{
        dataField: 'name', // nom de la colonne selon laquelle le tri doit être effectué
        order: 'asc' // ordre de tri
    }];

    const options = {
        custom: true,
        totalSize: users ? users.length : 0
    };
    const columns = [
        {
          dataField: 'name',
          text: 'Nom',
          sort: true,
          sortCaret: sortCaret
        },
        {
          dataField: 'email',
          text: 'Email',
          sort: true,
          sortCaret: sortCaret
        },
        {
          dataField: 'username',
          text: 'Username',
          sort: true,
          sortCaret: sortCaret
        },
        {
          dataField: 'role',
          text: 'Role',
          sort: true,
          sortCaret: sortCaret
        },
        {
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        csvExport: false,
        formatter: (cell, row) => {
            return (
                <div className="action-buttons">
                    <Button variant="primary" onClick={() => handleEditModalShow(row)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(row)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
                );
        }
        }
    ];
    
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Mettre à jour filteredUsers chaque fois que les users changent
    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleFilterChange = (event) => {
        const filterText = event.target.value.toLowerCase();
        setFilteredUsers(users.filter(user =>
            user.name.toLowerCase().includes(filterText) ||
            user.email.toLowerCase().includes(filterText) ||
            user.username.toLowerCase().includes(filterText) ||
            user.role.toLowerCase().includes(filterText)
        ));
    }

    // modifie un user
    const handleChange = (event) => {
        setUpdatedUser({
          ...updatedUser,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(updatedUser);
        setUpdatedUser({});
        setEditModalShow(false);
      };
    
      const handleEditModalShow = (user) => {
        setUpdatedUser(user);
        setEditModalShow(true);
      };
    // ajoute un user
    const handleAddUser = (event) => {
        event.preventDefault();
        addUser(newUser);
        setAddModalShow(false);
        setNewUser({name: '', username: '', email: '', password: '', role: ''});
    };

    const handleNewUserChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };
    // supprime un user
    const handleDeleteConfirm = () => {
        deleteUser(deletingUser._id);
        setDeleteModalShow(false);
        setDeletingUser(null);
    };

    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setDeleteModalShow(true);
    };
      
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="admin-container">
            <h1>Page d'administration</h1>
            <h2>Liste des utilisateurs</h2>
            <div className="user-table-container">
            <div className="search-add-wrapper">
    <div className="search-input">
        <input type="text" placeholder="Rechercher..." onChange={handleFilterChange} />
        <FaSearch />
    </div>
    <Button variant="primary" onClick={() => setAddModalShow(true)}>
        <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur
    </Button>
</div>
                {filteredUsers && filteredUsers.length > 0 && 
                <PaginationProvider pagination={paginationFactory(options)}>
                {({ paginationProps, paginationTableProps }) => (
                    <div>
                        <BootstrapTable 
                            keyField='_id' 
                            data={ filteredUsers }
                            columns={ columns }
                            {...paginationTableProps}
                            defaultSorted={ defaultSorted }
                            classes="user-table"
                        />
                        <div className="pagination-wrapper">
                            <PaginationTotalStandalone
                                { ...paginationProps}
                            />
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                        </div>
                    </div>
                )}
            </PaginationProvider>
                
            }

            </div>
            {/*Modal de suppression*/}
            <DeleteUserModal 
                show={deleteModalShow} 
                handleClose={() => setDeleteModalShow(false)}
                deletingUser={deletingUser}
                handleDeleteConfirm={handleDeleteConfirm}
            />
            {/*Modal de d'ajout*/}
            <AddUserModal 
                show={addModalShow} 
                handleClose={() => setAddModalShow(false)}
                handleAddUser={handleAddUser}
                handleNewUserChange={handleNewUserChange}
            />
            {/*Modal de modification*/}
            <EditUserModal 
                show={editModalShow} 
                handleClose={() => setEditModalShow(false)}
                updatedUser={updatedUser}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Admin;
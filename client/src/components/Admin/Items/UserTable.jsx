import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaSearch } from 'react-icons/fa';


const UserTable = ({ users, handleFilterChange, setAddModalShow, onDeleteClick, onEditClick, isLoading }) => {
    function sortCaret(order) {
        if (!order) return (<></>);
        else if (order === 'asc') return (<>&nbsp;<FontAwesomeIcon icon={faArrowUp} /></>);
        else if (order === 'desc') return (<>&nbsp;<FontAwesomeIcon icon={faArrowDown} /></>);
        return null;
    }

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    const options = {
        custom: true,
        totalSize: users ? users.length : 0,
        sizePerPage: 10
    };

    const columns = [
        {
            dataField: 'name',
            text: 'Nom',
            sort: true,
            sortCaret: sortCaret,
            style: { 
              width: '20%',
            },
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            sortCaret: sortCaret,
            style: { 
              width: '30%',
            },
        },
        {
            dataField: 'username',
            text: 'Username',
            sort: true,
            sortCaret: sortCaret,
            style: { 
              width: '20%',
            },
        },
        {
            dataField: 'role',
            text: 'Role',
            sort: true,
            sortCaret: sortCaret,
            style: { 
              width: '20%',
            },
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            style: { 
              width: '10%',
            },
            formatter: (cell, row) => {
                return (
                    <div className="action-buttons">
                        <Button variant="primary" onClick={() => onEditClick(row)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button variant="danger" onClick={() => onDeleteClick(row)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="user-table-container">
          <div className="search-add-wrapper">
            <div className="search-input">
              <input type="text" placeholder="Rechercher..." onChange={handleFilterChange} />
              <FaSearch />
            </div>
            <Button variant="primary" onClick={() => setAddModalShow(true)}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter
            </Button>
          </div>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Chargement...</span>
              </Spinner>
            </div>
          ) : users ? (
            <PaginationProvider pagination={paginationFactory(options)}>
              {({ paginationProps, paginationTableProps }) => (
                <div>
                  <BootstrapTable 
                    keyField='_id' 
                    data={ users }
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
          ) : (
            <p>Aucun utilisateur à afficher</p>
          )}
        </div>
    );
};

export default UserTable;

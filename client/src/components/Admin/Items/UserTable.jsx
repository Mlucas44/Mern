import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaSearch } from 'react-icons/fa';


const UserTable = ({ users, handleFilterChange, setAddModalShow, onDeleteClick, onEditClick }) => {
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
              <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur
            </Button>
          </div>
          {users ? (
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
            <p>Loading...</p>
          )}
        </div>
    );
};

export default UserTable;

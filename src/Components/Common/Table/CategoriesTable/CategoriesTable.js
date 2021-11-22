import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { CategoriesItemsData } from "./CategoriesItemsData";
import {ReactComponent as EditIcon} from '../../../../Assets/Icon/Edit.svg';
import {ReactComponent as DeleteIcon} from '../../../../Assets/Icon/Delete.svg';
import "./CategoryTable.css";
import { confirmAlert } from 'react-confirm-alert';
import {ReactComponent as BagIcon} from '../../../../Assets/Icon/Shoppingbasket.svg';
import {ReactComponent as AddIcon} from '../../../../Assets/Icon/Add.svg';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CategoriesTable = () => {
  const [category, setCat] = useState();
  const [subCategory, setSubCat] = useState();
  const [modal, setModal] = useState(false);
  const [catcheck, setcatcheck] = useState(false);
  const products = CategoriesItemsData.map((custom) => [
    {
      serialno: custom.serialno,
      date: custom.date,
      cat: category?category:custom.cat,
      subcat: custom.subcat,
    },
  ]);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

function handleEdit(id, cat) {
  console.log(id)
  cat = category;
  console.log(cat);
}

function addCategory()
{
  alert(true);
  setcatcheck(true);
}

console.log('CATEGORY:' , category);

  function handleDelete(rowId, name) {
    confirmAlert({
      title: 'Delete',
      message: `Are you sure you want to remove this item from the table?`,
      buttons: [
        {
          label: 'Yes',
          className: 'btn btn-danger',
          onClick: () => {
            console.log('ROW ID: ',rowId);
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  }
  const columns = [
    {
      dataField: "serialno",
      text: "Serial No",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: catcheck?category:"cat",
      text: "Category",
      headerSortingStyle,
      sort: true,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "subcat",
      text: "Sub-Category",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
   
      {
        dataField: "link",
        text: "Action",
        headerAlign: "center",
        align: "center",
        formatter: (rowContent, row) => {
          return (
            <div className="d-flex justify-content-evenly">
              
                <EditIcon className="mt-1" onClick={() => handleEdit(row.serialno, row.cat)}/>
                <DeleteIcon className="iconHover" onClick={() => handleDelete(row.serialno, row.name)}/>
            
            </div>
          );
        },
      },

   
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return (
    <>
<div className="page-heading d-flex align-items-center p-3 justify-content-between">
  <div className="d-flex">
        <BagIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Categories </h3>
        </div>
        <div className="d-flex align-items-center "><button type="submit" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"> <AddIcon /> Add New Categories</button></div>
      </div>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body p-4">
        <form>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Category</label>
            <input type="text" className="form-control" id="category" placeholder="category" onChange={e => setCat(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Sub Categories</label>
            <input type="text" className="form-control" id="sub-category" placeholder="sub category" onChange={e => setSubCat(e.target.value)}/>
          </div>
        </form>
      </div>
      <div className="modal-footer border-0 d-block mx-auto">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary" onClick={() => addCategory()}>Add Categories</button>
      </div>
    </div>
  </div>
</div>


    <div className="card">
    <div className="table-responsive" style={{ padding: "20px" }}>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          totalSize: products.length,
          prePageText: "Previous",
          nextPageText: "Next",
          page: 1,
          sizePerPage: 4,
          sizePerPageList: [
            {
              text: "5",
              value: 5,
            },

            {
              text: "10",
              value: 10,
            },
            {
              text: "30",
              value: 30,
            },
            {
              text: "50",
              value: 50,
            },
            {
              text: "All",
              value: products.length,
            },
          ],
          hideSizePerPage: products.length === 0,
        })}
        keyField="id"
        columns={columns}
        data={CategoriesItemsData.map((item) => item)}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={CategoriesItemsData.map((item) => item)}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-between mb-3">
                  <SizePerPageDropdownStandalone {...paginationProps} />
                  <SearchBar {...toolkitprops.searchProps} srText=" " />
                </div>
                <BootstrapTable
                  {...toolkitprops.baseProps}
                  {...paginationTableProps}
                  defaultSorted={defaultSorted}
                  defaultSortDirection="asc"
                  wrapperClasses="table-responsive"
                  hover
                  striped
                  condensed={false}
                  noDataIndication="No Data Is Available"
                />
                <div className="d-flex justify-content-end">
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
      
    </div>
    </div>
    </>
  );
};

export default CategoriesTable;

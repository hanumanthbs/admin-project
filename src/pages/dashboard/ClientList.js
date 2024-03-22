import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import DataTable from "react-data-table-component";
import { Button, Card, Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ProfileCover from "../../assets/img/profile-cover.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const [clientData, setClientData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = async () => {
    await axios
      .get("/api/Client")
      .then((res) => {
        setClientData(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const customStyles = {
    headCells: {
      style: { fontWeight: "bold" },
    },
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    { name: "Client", selector: (row) => row.ClientName, sortable: true },
    { name: "Business", selector: (row) => row.BussinessName, sortable: true },
    { name: "Industry", selector: (row) => row.Industry, sortable: true },
    { name: "Mobile", selector: (row) => row.Mobile, sortable: true },
    { name: "Email", selector: (row) => row.Email, sortable: true },
    {
      name: "Approve",
      button: true,
      cell: (row) => (
        <FontAwesomeIcon
          icon={faEye}
          className="icon-dark text-success"
          onClick={() => handleOpenModal(row)}
          style={{ cursor: "pointer", fontSize: "1.3em" }}
        />
      ),
      sortable: true,
    },
  ];

  const handleOpenModal = (values) => {
    setRowData(values);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleApprove = async (values) => {
    const temp = {};

    temp.status = values.Approve === 1 ? 0 : 1;

    if (
      window.confirm(
        values.Approve === 1
          ? "Are you sure want to Unapprove ? "
          : "Are you sure want to Approve ?"
      )
    ) {
      await axios
        .post("/api/AUClient?id=" + rowData.Id, temp)
        .then((res) => {
          if (res.data.status === 1) {
            getClientData();
            setOpenModal(false);
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container">
      <div>
        <Modal as={Modal.Dialog} centered show={openModal} onHide={handleClose}>
          <Modal.Body>
            <Card border="light" className="text-center p-0 mb-4">
              <div
                style={{ backgroundImage: `url(${ProfileCover})` }}
                className="profile-cover rounded-top"
              />
              <Card.Body className="pb-2">
                <Card.Img
                  src={rowData.pic}
                  alt={rowData.ClientName}
                  className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                />
                <Card.Title>{rowData.ClientName}</Card.Title>
                <Card.Subtitle className="fw-normal">
                  {rowData.BussinessName + " , " + rowData.Industry}
                </Card.Subtitle>
                <Card.Text className="text-gray">
                  <span>{rowData.City}</span>
                  <br></br>
                  <span>{rowData.Mobile}</span>
                  <br></br>
                  <span>{rowData.Email}</span>
                </Card.Text>

                <Button
                  variant={rowData.Approve === 0 ? "success" : "danger"}
                  size="sm"
                  onClick={() => handleApprove(rowData)}
                >
                  {rowData.Approve === 0 ? "Approve" : "Unapprove"}
                </Button>

                <div className="text-right">
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={handleClose}
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </div>

      {/* <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: "11" }}
      >
        <div
          id="liveToast"
          className="toast  bg-success text-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          bg-primary
        >
          <div className="d-flex">
            <div className="toast-body">{message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div> */}
      <ToastContainer />

      <DataTable
        columns={columns}
        data={clientData}
        pagination
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
};

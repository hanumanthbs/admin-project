import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import DataTable from "react-data-table-component";
import {
  faEye,
  faVideo,
  faImage,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Modal } from "@themesberg/react-bootstrap";
import ProfileCover from "../../assets/img/profile-cover.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("/api/Adsy")
      .then((res) => {
        setData(res.data.list);
      })
      .catch((err) => {
        localStorage.setItem("adsyUser", null);
        toast.error("Session Expired !!");
        window.location.href = "/Login";
      });
  };

  const CustomDiv = ({ children }) => {
    return <div style={{ whiteSpace: "wrap" }}>{children}</div>;
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => <CustomDiv>{row.Title}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => <CustomDiv>{row.ClientData.ClientName}</CustomDiv>,
      sortable: true,
    },
    {
      name: "No Of Users",
      selector: (row) => <CustomDiv>{row.NoUsers}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => <CustomDiv>{row.Amount}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Status",
      width: "250px",
      cell: (row) => {
        return (
          <table style={{ width: "100%" }}>
            <tr>
              <th>Payment </th>
              <td>
                {row.PaymentStatus === 1 ? "Success" : "Pending / Failed"}
              </td>
              <td>
                {row.PaymentStatus === 1 ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon-dark text-success"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="icon-dark text-danger"
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>Approval </th>
              <td>{row.Approve === 1 ? "Approved" : "Unapproved"}</td>
              <td>
                {row.Approve === 1 ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon-dark text-success"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="icon-dark text-danger"
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>Adsy</th>
              <td>{row.Completed === 1 ? "Completed" : "Not Completed"}</td>
              <td>
                {row.Completed === 1 ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon-dark text-success"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="icon-dark text-danger"
                  />
                )}
              </td>
            </tr>
          </table>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
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

  const customStyles = {
    headCells: {
      style: { fontWeight: "bold" },
    },
  };

  const handleOpenModal = (values) => {
    setRowData(values);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleApprove = async (values) => {
    const status = values.Approve === 1 ? 0 : 1;

    if (
      window.confirm(
        values.Approve === 1
          ? "Are you sure want to Unapprove ? "
          : "Are you sure want to Approve ?"
      )
    ) {
      await axios
        .put("/api/AUAdsy?id=" + rowData.id + "&status=" + status)
        .then((res) => {
          if (res.data.status === 1) {
            getData();
            setOpenModal(false);
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          localStorage.setItem("adsyUser", null);
          toast.error("Session Expired !!");
          window.location.href = "/Login";
        });
    }
  };

  return (
    <div className="container">
      {Object.values(rowData).length > 0 ? (
        <div className="modal-xl">
          <Modal
            as={Modal.Dialog}
            centered
            show={openModal}
            onHide={handleClose}
            size="lg"
          >
            <Modal.Body>
              <Card border="light" className="p-0 mb-4">
                <div
                  style={{ backgroundImage: `url(${ProfileCover})` }}
                  className="profile-cover rounded-top"
                />
                <Card.Body className="pb-2">
                  <Card.Img
                    src={rowData.ClientData.pic}
                    alt={rowData.ClientData.ClientName}
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                  />
                  <Card.Title className="text-center">
                    {rowData.ClientData.ClientName}
                  </Card.Title>
                  <Card.Subtitle className="text-center fw-normal">
                    {rowData.ClientData.BussinessName +
                      " , " +
                      rowData.ClientData.Industry}
                  </Card.Subtitle>
                  <Card.Text className="text-center text-gray">
                    <span>{rowData.ClientData.City}</span>
                    <br></br>
                    <span>{rowData.ClientData.Mobile}</span>
                    <br></br>
                    <span>{rowData.ClientData.Email}</span>
                  </Card.Text>

                  <hr></hr>

                  <div>
                    {rowData.Templates.map((obj, i) => {
                      return (
                        <div key={i}>
                          {obj.TemplateType === 1 &&
                          (obj.QuestionType === 1 || obj.QuestionType === 2) ? (
                            <>
                              <div className="fw-bold ">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              {obj.Choices.map((val, j) => {
                                return <div>{j + 1 + "." + val}</div>;
                              })}
                            </>
                          ) : obj.TemplateType === 1 &&
                            (obj.QuestionType === 3 ||
                              obj.QuestionType === 4) ? (
                            <>
                              <div className="fw-bold ">
                                {i + 1 + ". " + obj.Question}
                              </div>
                            </>
                          ) : obj.TemplateType === 2 ? (
                            <>
                              <div className="fw-bold">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              <div className="text-center">
                                {/* <FontAwesomeIcon
                                  icon={faVideo}
                                  className="icon-dark text-success"
                                  style={{ cursor: "pointer", fontSize: "2em" }}
                                  onClick={() => window.open(obj.URL)}
                                  title="Click to watch"
                                /> */}
                                <iframe
                                  src={obj.URL}
                                  width="600"
                                  height="400"
                                />
                              </div>
                            </>
                          ) : obj.TemplateType === 3 ? (
                            <>
                              <div className="fw-bold">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              <div className="text-center">
                                {/* <FontAwesomeIcon
                                  icon={faImage}
                                  className="icon-dark text-success"
                                  style={{ cursor: "pointer", fontSize: "2em" }}
                                  onClick={() => window.open(obj.URL)}
                                  title="Click to view"
                                /> */}

                                <img src={obj.URL} width="400" height="300" />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <hr></hr>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-right mb-4">
                    <Button
                      variant={rowData.Approve === 0 ? "success" : "danger"}
                      size="sm"
                      onClick={() => handleApprove(rowData)}
                    >
                      {rowData.Approve === 0 ? "Approve" : "Unapprove"}
                    </Button>
                  </div>

                  <div className="text-right ">
                    <Button
                      variant="link"
                      className="text-danger fw-bold ms-auto"
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
      ) : (
        <></>
      )}

      <ToastContainer />

      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
};

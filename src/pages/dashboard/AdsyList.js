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
        console.log("res.data.data", res.data.list);
        setData(res.data.list);
      })
      .catch((err) => console.error(err));
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
      selector: (row) => row.Title,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row.ClientData.ClientName,
      sortable: true,
    },
    {
      name: "No Of Users",
      selector: (row) => row.NoUsers,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
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
                          {obj.TemplateType === 1 && obj.QuestionType === 1 ? (
                            <>
                              <div className="fw-bold ">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              {obj.Choices.map((val, j) => {
                                return <div>{j + 1 + "." + val}</div>;
                              })}
                            </>
                          ) : obj.TemplateType === 1 &&
                            obj.QuestionType === 2 ? (
                            <>
                              <div className="fw-bold ">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              {obj.Choices.map((val, j) => {
                                return <div>{j + 1 + "." + val}</div>;
                              })}
                            </>
                          ) : obj.TemplateType === 2 ? (
                            <>
                              <div className="fw-bold">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              <div className="text-center">
                                <FontAwesomeIcon
                                  icon={faVideo}
                                  className="icon-dark text-success"
                                  style={{ cursor: "pointer", fontSize: "2em" }}
                                  onClick={() => window.open(obj.URL)}
                                  title="Click to watch"
                                />
                              </div>
                            </>
                          ) : obj.TemplateType === 3 ? (
                            <>
                              <div className="fw-bold">
                                {i + 1 + ". " + obj.Question}
                              </div>
                              <div className="text-center">
                                <FontAwesomeIcon
                                  icon={faImage}
                                  className="icon-dark text-success"
                                  style={{ cursor: "pointer", fontSize: "2em" }}
                                  onClick={() => window.open(obj.URL)}
                                  title="Click to view"
                                />
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

                  <div className="text-right">
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

      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
};

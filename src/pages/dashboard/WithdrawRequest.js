import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import DataTable from "react-data-table-component";
import {
  faClock,
  faSpinner,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("/api/WithdrawalRequest")
      .then((res) => {
        setData(res.data.list);
      })
      .catch((err) => {
        localStorage.setItem("adsyUser", null);
        toast.error("Session Expired !!");
        window.location.href = "/Login";
      });
  };

  const handleChangeStatus = async (value, id) => {
    if (window.confirm("Are you sure want to update ? ")) {
      await axios
        .get(`/api/UpdateWithdrawalRequest?wid=${id}&status=${value}`)
        .then((res) => {
          if (res.data.status === 1) {
            getData();
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
      name: "Name",
      selector: (row) => <CustomDiv>{row.FullName}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => <CustomDiv>{row.Amount}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => <CustomDiv>{row.AccountNo}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Bank",
      selector: (row) => <CustomDiv>{row.Bank}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => <CustomDiv>{row.Branch}</CustomDiv>,
      sortable: true,
    },
    {
      name: "IFSC Code",
      selector: (row) => <CustomDiv>{row.IFSCCode}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Date Time",
      selector: (row) => <CustomDiv>{row.DateTime}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row.status === 0
          ? "Pending"
          : row.status === 1
          ? "Processing"
          : row.status === 2
          ? "Completed"
          : "",
      sortable: true,
    },
    {
      name: "Update Status",
      cell: (row) => (
        <div>
          <FontAwesomeIcon
            icon={faClock}
            className="icon-dark text-info"
            style={{ cursor: "pointer", fontSize: "1.5em", marginRight: "5px" }}
            title="Pending"
            onClick={() => handleChangeStatus("0", row.id)}
          />
          <FontAwesomeIcon
            icon={faSpinner}
            className="icon-dark text-warning"
            style={{ cursor: "pointer", fontSize: "1.5em", marginRight: "5px" }}
            title="Processing"
            onClick={() => handleChangeStatus("1", row.id)}
          />
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="icon-dark text-success"
            style={{ cursor: "pointer", fontSize: "1.5em" }}
            title="Completed"
            onClick={() => handleChangeStatus("2", row.id)}
          />
        </div>
      ),
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: { fontWeight: "bold" },
    },
  };

  return (
    <div className="container">
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

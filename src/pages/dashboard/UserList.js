import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";

export default () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await axios
      .get("/api/UsersList")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        localStorage.setItem("adsyUser", null);
        toast.error("Session Expired !!");
        window.location.href = "/Login";
      });
  };

  const customStyles = {
    headCells: {
      style: { fontWeight: "bold" },
    },
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
      name: "",
      button: true,
      cell: (row) => (
        <img src={row.pic} alt="Profile Pic" className="user-avatar" />
      ),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => <CustomDiv>{row.Name}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => <CustomDiv>{row.Email}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => <CustomDiv>{row.Mobile}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => <CustomDiv>{row.Password}</CustomDiv>,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => <CustomDiv>{row.City}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Completed Adsy",
      selector: (row) => <CustomDiv>{row.CompletedAdsy}</CustomDiv>,
      sortable: true,
    },
    {
      name: "Total Earning",
      selector: (row) => <CustomDiv>{row.TotalEarning}</CustomDiv>,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <DataTable
        columns={columns}
        data={userData}
        pagination
        customStyles={customStyles}
      ></DataTable>

      <ToastContainer />
    </div>
  );
};

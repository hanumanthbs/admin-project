import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import DataTable from "react-data-table-component";

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
    {
      name: "",
      button: true,
      cell: (row) => (
        <img src={row.pic} alt="Profile Pic" className="user-avatar" />
      ),
      sortable: true,
    },
    { name: "Name", selector: (row) => row.Name, sortable: true },
    { name: "Email", selector: (row) => row.Email, sortable: true },
    { name: "Mobile", selector: (row) => row.Mobile, sortable: true },
    { name: "Password", selector: (row) => row.Password, sortable: true },
    { name: "City", selector: (row) => row.City, sortable: true },
    {
      name: "Completed Adsy",
      selector: (row) => row.CompletedAdsy,
      sortable: true,
    },
    {
      name: "Total Earning",
      selector: (row) => row.TotalEarning,
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
    </div>
  );
};

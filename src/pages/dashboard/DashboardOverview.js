import React, { useEffect, useState } from "react";
import axios from "../../services/Api";
import { Col, Row } from "@themesberg/react-bootstrap";
import { CounterWidget, SalesValueWidgetPhone } from "../../components/Widgets";
import {
  faUser,
  faUsers,
  faUserTie,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import adsy from "../../assets/img/adsy-logo.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("/api/AdminDashboard")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        localStorage.setItem("adsyUser", null);
        toast.error("Session Expired !!");
        window.location.href = "/Login";
      });
  };

  return (
    <>
      <Row>
        <Col xs={12} className="mb-4">
          <p className="text-muted fw-light h5">Welcome Super Admin !!</p>
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <Link to="/ClientList">
            <CounterWidget
              category="Total Clients"
              // title="345k"
              // period="Feb 1 - Apr 1"
              percentage={data.TotalClient}
              icon={faUser}
              // iconColor="shape-secondary"
            />
          </Link>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <Link to="/UserList">
            <CounterWidget
              category="Total Users"
              // title="$43,594"
              // period="Feb 1 - Apr 1"
              percentage={data.TotalUsers}
              icon={faUsers}
              // iconColor="shape-tertiary"
            />
          </Link>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <Link to="/AdsyList">
            <CounterWidget
              category="Total Adsy"
              // title="$43,594"
              // period="Feb 1 - Apr 1"
              percentage={data.TotalAdsy}
              icon={faUserTie}
              // iconColor="shape-tertiary"
            />
          </Link>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <Link to="/AdsyList">
            <CounterWidget
              category="Total Money Earned"
              // title="$43,594"
              // period="Feb 1 - Apr 1"
              percentage={data.TotalEarnings}
              icon={faMoneyBill}
              // iconColor="shape-tertiary"
            />
          </Link>
        </Col>
      </Row>

      <ToastContainer />
    </>
  );
};

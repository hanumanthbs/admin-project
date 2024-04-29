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
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Row>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Clients"
            // title="345k"
            // period="Feb 1 - Apr 1"
            percentage={data.TotalClient}
            icon={faUser}
            // iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Users"
            // title="$43,594"
            // period="Feb 1 - Apr 1"
            percentage={data.TotalUsers}
            icon={faUsers}
            // iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Adsy"
            // title="$43,594"
            // period="Feb 1 - Apr 1"
            percentage={data.TotalAdsy}
            icon={faUserTie}
            // iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Money Earned"
            // title="$43,594"
            // period="Feb 1 - Apr 1"
            percentage={data.TotalEarnings}
            icon={faMoneyBill}
            // iconColor="shape-tertiary"
          />
        </Col>
      </Row>
    </>
  );
};

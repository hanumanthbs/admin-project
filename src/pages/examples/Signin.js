import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import BgImage from "../../assets/img/illustrations/signin.svg";
import adsyLogo from "../../assets/img/adsy-logo.jpg";
import { ToastContainer, toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

function Signin() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const copyValues = { ...values };
    copyValues[e.target.name] = e.target.value;
    setValues(copyValues);
  };

  function authenticateUser(e) {
    e.preventDefault();
    const temp = {};

    temp.email = values.email;
    temp.password = values.password;

    axios
      .post("https://adsy.co.in/Backend/api/Auth_Admin", temp)
      .then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem(
            "adsyUser",
            JSON.stringify({
              login: true,
              id: res.data.Id,
              email: res.data.email,
              token: res.data.token,
              role: res.data.role,
            })
          );

          window.location.href = "/#/dashboard/overview";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        localStorage.setItem("AdsyUser", null);
        toast.error("Session Expired !!");
        window.location.href = "/Login";
      });
  }

  return (
    <main>
      <ToastContainer />

      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center ">
                  <h3 className="mb-0">
                    <img src={adsyLogo} alt="logo" width="120px" />
                  </h3>
                </div>

                <Form className="mt-4" onSubmit={authenticateUser}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          required
                          type="password"
                          placeholder="Password"
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        {/* <FormCheck.Input id="defaultCheck5" className="me-2" /> */}
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          {/* Remember me */}
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Forgot password?
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                {/* <div className="d-flex justify-content-center my-4">
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-twitter me-2"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pil text-dark"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Signin;

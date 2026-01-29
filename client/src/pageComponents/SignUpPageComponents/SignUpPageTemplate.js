import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { SignUpValidation } from "../../Validations/SignUpValidation";

// Best practice: keep a configured client (ideally in a separate api.js)
const api = Axios.create({
  baseURL: "http://localhost:3005",
  withCredentials: true, // important if backend sets cookies
});

function SignUpPageTemplate() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: [],
    newPassword: [],
    confirmPassword: [],
    phoneNumber: [],
    firstName: [],
    lastName: [],
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const executeSignUp = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = SignUpValidation(
      email,
      newPassword,
      confirmPassword,
      phoneNumber,
      firstName,
      lastName
    );
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (fieldErrors) => fieldErrors.length > 0
    );
    if (hasErrors) return;

    try {
      setLoading(true);
      await api.post("/user/register", {
        email,
        phoneNumber,
        firstName,
        lastName,
        newPassword,
      });
      navigate("/pages/AuthenticationPage");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Signup failed. Please try again.";
      setServerError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="LogIn" className="block block-login">
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="h2 text-center">WELCOME!</h2>
          </Col>
        </Row>

        <Row className="py-2" />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4 className="h4">Create Account</h4>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={executeSignUp} noValidate>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupFname">
                  <Form.Label style={{ color: "black" }}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                  />
                  {errors.firstName?.length > 0 && (
                    <div className="text-danger">{errors.firstName.join(", ")}</div>
                  )}
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formGroupLname">
                  <Form.Label style={{ color: "black" }}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                  {errors.lastName?.length > 0 && (
                    <div className="text-danger">{errors.lastName.join(", ")}</div>
                  )}
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label style={{ color: "black" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {errors.email?.length > 0 && (
                  <div className="text-danger">{errors.email.join(", ")}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPhoneNo">
                <Form.Label style={{ color: "black" }}>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete="tel"
                />
                {errors.phoneNumber?.length > 0 && (
                  <div className="text-danger">{errors.phoneNumber.join(", ")}</div>
                )}
              </Form.Group>

              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupNewPassword">
                  <Form.Label style={{ color: "black" }}>New Password</Form.Label>

                  <InputGroup className="mb-1">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <InputGroup.Text>
                      <Button
                        type="button"
                        variant="light"
                        style={{ padding: "0", height: "100%" }}
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <Visibility style={{ fontSize: "20px" }} />
                        ) : (
                          <VisibilityOff style={{ fontSize: "20px" }} />
                        )}
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>

                  {errors.newPassword?.length > 0 && (
                    <div className="text-danger">{errors.newPassword.join(", ")}</div>
                  )}
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formGroupConfirmPassword">
                  <Form.Label style={{ color: "black" }}>Confirm Password</Form.Label>

                  <InputGroup className="mb-1">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <InputGroup.Text>
                      <Button
                        type="button"
                        variant="light"
                        style={{ padding: "0", height: "100%" }}
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? (
                          <Visibility style={{ fontSize: "20px" }} />
                        ) : (
                          <VisibilityOff style={{ fontSize: "20px" }} />
                        )}
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>

                  {errors.confirmPassword?.length > 0 && (
                    <div className="text-danger">{errors.confirmPassword.join(", ")}</div>
                  )}
                </Form.Group>
              </Row>

              {serverError && <div className="text-danger mb-2">{serverError}</div>}

              <Button type="submit" variant="secondary" size="sm" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form>

            <Row className="pt-2" />
            <p>
              Already got an account?{" "}
              <Link to="../pages/AuthenticationPage" style={{ color: "black" }}>
                Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignUpPageTemplate;

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
import { LoginValidation } from "../../Validations/LoginValidation";

// Best practice: put this in a separate api.js file normally
const api = Axios.create({
  baseURL: "http://localhost:3005",
  withCredentials: true,
});

function AuthenticationPageTemplate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: [], password: [] });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const loginErrors = LoginValidation(email, password);
    setErrors(loginErrors);

    const hasErrors = Object.values(loginErrors).some(
      (fieldErrors) => fieldErrors.length > 0
    );
    if (hasErrors) return;

    try {
      setLoading(true);
      const res = await api.post("/user/validateLogin", { email, password });

      if (res.data?.type === "customer") navigate("/pages/CustomerHomePage");
      else if (res.data?.type === "admin") navigate("/pages/AdminPanel");
      else setServerError("Login failed. Please try again.");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong. Please try again.";
      setServerError(String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="LogIn" className="block block-login">
      <Container fluid>
        <Row className="py-3" />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h2 className="h2 text-center">WELCOME BACK!</h2>
          </Col>
        </Row>

        <Row className="py-2" />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h4 className="h4">Sign into Account</h4>
          </Col>
        </Row>

        <Row className="py-2" />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group
                className="mb-3"
                controlId="formGroupEmail"
                style={{ color: "black" }}
              >
                <Form.Label>Email</Form.Label>
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

              <Form.Group
                className="mb-3"
                controlId="formGroupPassword"
                style={{ color: "black" }}
              >
                <Form.Label>Password</Form.Label>

                <InputGroup className="mb-1">
                  <Form.Control
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <InputGroup.Text id="basic-addon2">
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

                {errors.password?.length > 0 && (
                  <div className="text-danger">
                    {errors.password.join(", ")}
                  </div>
                )}
              </Form.Group>

              {serverError && (
                <div className="text-danger mb-2">{serverError}</div>
              )}

              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Row className="py-2" />
              <p className="mb-0">
                Haven't got an account yet?{" "}
                <Link
                  to="../pages/SignUpPage"
                  className="mb-3"
                  style={{ color: "black" }}
                >
                  Sign Up
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AuthenticationPageTemplate;

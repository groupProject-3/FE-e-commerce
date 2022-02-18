import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Spinner, Alert, Toast } from "react-bootstrap";
import { useRouter } from "next/router";

// inline css

const form = {
  marginTop: "190px",
};

const buttonLogin = {
  width: "320px",
  height: "60px",
  borderRadius: "60px",
};

const backgroundLogin = {
  backgroundColor: "#ffefe5",
  height: "790px",
};

const formLogin = {
  height: "60px",
  borderRadius: "50px",
  backgroundColor: "#ffffff00",
};

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("danger");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  function handleSign() {
    const body = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://18.140.1.124:8081/users", body)
      .then(({ data }) => {
        console.log(data);
        setShow(true);
        setMsg(data.message);
        setVariant("success");

        setTimeout(() => {
          router.push("/user/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setMsg("Invalid Email / Password");

        if (password.length <= 0) {
          setShow(true);
          setMsg("Password Cannot be Empty");
        }
        if (email.length <= 0) {
          setShow(true);
          setMsg("Email Cannot be Empty");
        }
      })
      .finally(() => {});
  }

  function returnAlert() {
    if (show) {
      return (
        <Toast bg={variant} onClose={() => setShow(false)}>
          <Toast.Header>
            <strong className="me-auto">Alert!</strong>
            <small>The Project-3 App</small>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      );
    }

    return <></>;
  }

  if (loading) {
    return (
      <div className="mt-3 ms-4">
        <br />

        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "0px" }} className="container-fluid row">
        <div style={backgroundLogin} className="col-6">
          <div className="">
            <div style={form} className="row justify-content-center">
              <div className="col-6">
                <p>{returnAlert()}</p>
                <Form>
                  <h3 className="text-center">
                    Wellcome to The Project-3 E-Commerce App
                  </h3>
                  <br />
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      style={formLogin}
                      className="shadow-sm"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      style={formLogin}
                      className="shadow-sm"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      style={formLogin}
                      className="shadow-sm"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <div className="text-center mt-4 me-5">
                      <Button
                        style={buttonLogin}
                        className="mx-3 shadow"
                        variant="success"
                        onClick={handleSign}
                      >
                        Create Account
                      </Button>
                      <br />
                      <h5 className="mt-3 ms-4 text-center">
                        Already have account ?{" "}
                        <a className="text-decoration-none " href="/user/login">
                          Login
                        </a>{" "}
                      </h5>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "0px" }} className="position-relative col-6">
          <img
            style={{ height: "790px" }}
            className="position-fixed"
            src="https://moneycrashers-sparkchargemedia.netdna-ssl.com/wp-content/uploads/2018/12/great-online-shopping-sites.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Login;

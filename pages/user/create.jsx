import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Spinner, Toast } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";

function CreatePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .post(" http://18.140.1.124:8081/user", body)
      .then(({ data }) => {
        console.log(data.data.token);
        localStorage.setItem("token", data.data.token);
        setShow(true);
        setMsg(data.message);
        setVariant("success");
        setTimeout(() => {
          router.push("/user/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err, "error");
        setMsg("Invalid Email / Password");
        setShow(true);

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
    <div
      className={`${styles.mainContainer} row container-fluid p-0 justify-content-center`}
    >
      <div
        className={`col-6 d-flex align-items-center justify-content-center ${styles.main}`}
      >
        <div className="d-flex justify-content-center ">
          <Form className={`d-flex flex-column ${styles.formContainer}`}>
            <p>{returnAlert()}</p>
            <h3 className="text-center">
              Wellcome to The Project-3 <br /> E-Commerce App
            </h3>
            <br />
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                className={`shadow ${styles.userInput}`}
                type="text"
                placeholder="Your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className={`shadow ${styles.userInput}`}
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className={` shadow ${styles.userInput}`}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              className={` shadow ${styles.buttonSubmit}`}
              variant="success"
              onClick={handleSign}
            >
              Submit
            </Button>
            <br />
            <h5 className="mt-3 ms-4 text-center">
              Didn’t have account ?{" "}
              <a className="text-decoration-none " href="/user/login">
                Login
              </a>
            </h5>
          </Form>
        </div>
      </div>
      <div className={`col-6 ${styles.side}`}></div>
    </div>
  );
}

export default CreatePage;

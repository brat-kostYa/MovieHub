import { FC, useState } from "react";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/userAuthContext";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import './customcss.css'

interface ISignInProps { };

const SignIn: FC<ISignInProps> = () => {
    const [logIndata, setLogInData] = useState({
        email: '',
        password: '',
        resetEmail: ''
    })
    const { logIn, resetPassword } = useUserAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [showRecoverPasswordModal, setRPModalShow] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Try auth:", logIndata)
            console.log('Email:', logIndata.email);
            console.log('Password:', logIndata.password);
            await logIn(logIndata.email, logIndata.password)
            navigate('/profile')
        }
        catch (error) {
            console.log("Error: ", error);
        }
    };

    const redirectToRegister = () => {
        navigate('/register')
    }
    const handleShowRevoverPasswordModal = () => {
        setRPModalShow(true)
        console.log("Modal active")
    }
    const handleCloseRecoverPassowordModal = () => {
        setRPModalShow(false)
        console.log("Modal closed")
    }
    const sendEmailRecoverMessage = async () => {
        try {
            console.log(logIndata)
            resetPassword(logIndata.resetEmail);
            console.log("Message sended")
        }
        catch (error) {
            console.log("Email not found in the database: ", logIndata);
            // Handle case where email doesn't exist in the database
            console.log("Error:", error);
        }
        setRPModalShow(false);
    };

    return (
        <div className="container-fluid">
            <Form className="border-2 p-4 border-primary rounded justify-content-center" onSubmit={handleSubmit}>
                <Form.Label className="h3 mb-3 ">Log In</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={logIndata.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setLogInData({
                                ...logIndata,
                                email: e.target.value
                            })
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={logIndata.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setLogInData({
                                    ...logIndata,
                                    password: e.target.value
                                })
                            }}
                        />
                        <Button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputGroup>

                </Form.Group>
                <div className="text-center mb-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div className="text-center mb-3">
                    <p><a onClick={redirectToRegister} className="link-primary link-offset-2 link-underline-opacity-25
                     link-underline-opacity-100-hover">Don`t have an account? Register it!</a></p>
                    <p><a onClick={handleShowRevoverPasswordModal} className="link-primary link-offset-2 link-underline-opacity-25
                     link-underline-opacity-100-hover">Forgot password?</a></p>
                </div>
            </Form>

            <div className="">
                <Modal className="" show={showRecoverPasswordModal} onHide={handleCloseRecoverPassowordModal} centered>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Recover password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="recoverModal.email">
                                    <Form.Label>
                                        Account email
                                    </Form.Label>
                                    <Form.Control type="email" placeholder="Associated email address" autoFocus
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setLogInData({
                                                ...logIndata,
                                                resetEmail: e.target.value
                                            })
                                        }} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseRecoverPassowordModal}>
                                Cansel
                            </Button>
                            <Button variant="primary" onClick={sendEmailRecoverMessage}>
                                Send link
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>

        </div>
    )
}

export default SignIn;
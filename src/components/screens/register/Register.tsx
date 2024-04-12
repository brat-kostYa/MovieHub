import React, { FC, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../register/custom.css';
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useUserAuth } from "../../../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

// const initialValue: IRegister = {
//     firstName: '',
//     secondName: '',
//     lastName: '',
//     gender: '',
//     email: '',
//     country: '',
//     password: '',
//     age: 18,
//     phoneNumber: '',
//     keyQuestion: '',
//     keyAnswer: ''
// };

interface IRegisterProps { };

const Register: FC<IRegisterProps> = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 18,
        phoneNumber: '',
        favouriteFilm: ''
    });
    const { signUp } = useUserAuth();
    const navigate = useNavigate();
    const [age, setAge] = useState(18);
    const [phone, setPhone] = useState('');
    const [emailValidated, setEmailValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [lowerValidated, setLowerValidated] = useState(false);
    const [specValidated, setSpecValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);
    const [numbersValidated, setNumbersValidated] = useState(false);
    const [confirmPassword, setConfirmedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (value: string) => {
        const upper = new RegExp('(?=.*[A-Z])');
        const lower = new RegExp('(?=.*[a-z])');
        const number = new RegExp('(?=.*[0-9])');
        const spec = new RegExp('(?=.*[!@#\$%\^&\*()-_\+=])');
        const length = new RegExp('(?=.{6,})');

        if (upper.test(value)) {
            setUpperValidated(true);
        } else {
            setUpperValidated(false);
        }

        if (lower.test(value)) {
            setLowerValidated(true);
        } else {
            setLowerValidated(false);
        }

        if (number.test(value)) {
            setNumbersValidated(true);
        } else {
            setNumbersValidated(false);
        }

        if (spec.test(value)) {
            setSpecValidated(true);
        } else {
            setSpecValidated(false);
        }

        if (length.test(value)) {
            setLengthValidated(true);
        } else {
            setLengthValidated(false);
        }

        setFormData(prevState => ({
            ...prevState,
            password: value
        }));
    };

    const handleConfirmPasswordChange = (value: string) => {
        if (formData.password === value && value !== '' && value !== null) {
            setConfirmedPassword(true);
        } else {
            setConfirmedPassword(false);
        }

        setFormData(prevState => ({
            ...prevState,
            confirmPassword: value
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            gender: value
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailValidated(emailPattern.test(value));
        handleChange(e);
    }

    const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(parseInt(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Try register: ", formData)
            await signUp(formData.email, formData.password)
            console.log('Form submitted:', formData);
            navigate('/profile')
        }
        catch (error) {
            console.log("Error: ", error)
        }
        // Handle form submission, e.g., send data to server

    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div>
                <Row className="mb-3">
                    <p className="h5 text-center">Registration Form</p>
                </Row>
                <Form className="border-2 p-2 border-primary rounded" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col sm={3} className="my-1">
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstName" type="text" placeholder="First name" onChange={handleChange} />
                        </Col>
                        <Col sm={3} className="my-1">
                            <Form.Label>Second name</Form.Label>
                            <Form.Control name="secondName" type="text" placeholder="Second name" onChange={handleChange} />
                        </Col>
                        <Col sm={3} className="my-1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Last name" onChange={handleChange} />
                        </Col>
                        <Col>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" aria-label="Gender select" onChange={handleGenderChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="my-1">
                            <Form.Label>Country/Phone number</Form.Label>
                            <PhoneInput defaultCountry="ua" value={phone} onChange={phone => setPhone(phone)} />
                        </Col>
                        <Col sm={2} className="my-1">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name="age" readOnly value={age} />
                            <Form.Range name="ageRange" min={12} max={130} onChange={handleChangeAge} defaultValue={age} value={age} />
                        </Col>
                        <Col sm={6} className="my-1">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <Form.Control name="email" aria-describedby="basic-addon2" type="email" placeholder="Email" onChange={handleEmailChange} />
                                <InputGroup.Text id="basic-addon2">ex@example.com</InputGroup.Text>
                            </InputGroup>
                            {!emailValidated && (
                                <div style={{ color: 'red' }}>Invalid email format!</div>
                            )}
                            {emailValidated && (
                                <div style={{ color: 'green' }}>Email is required!</div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Your password</Form.Label>
                            <InputGroup>
                                <Form.Control name="password" type={showPassword ? "text" : "password"} placeholder="Password"
                                    onChange={(e) => handlePasswordChange(e.target.value)} />
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
                            
                            <div className="flex tracker-box">
                                <div style={{ padding: '5px' }} className={lowerValidated ? 'validated' : 'not-validated'}>
                                    {lowerValidated ? '✔' : '❌'} {/* Unicode symbol for check mark and cross mark */}
                                    Low
                                </div>
                                <div style={{ padding: '5px' }} className={upperValidated ? 'validated' : 'not-validated'}>
                                    {upperValidated ? '✔' : '❌'}
                                    Up
                                </div>
                                <div style={{ padding: '5px' }} className={numbersValidated ? 'validated' : 'not-validated'}>
                                    {numbersValidated ? '✔' : '❌'}
                                    Num
                                </div>
                                <div style={{ padding: '5px' }} className={specValidated ? 'validated' : 'not-validated'}>
                                    {specValidated ? '✔' : '❌'}
                                    Spec
                                </div>
                                <div style={{ padding: '5px' }} className={lengthValidated ? 'validated' : 'not-validated'}>
                                    {lengthValidated ? '✔' : '❌'}
                                    Len
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <Form.Label>Confirm password</Form.Label>
                            <InputGroup>
                                <Form.Control name="confirmPassword" type={showPassword ? "text" : "password"} 
                                    placeholder="Confirm password" onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>    
                            </InputGroup>
                            {!confirmPassword && (
                                <div style={{ color: 'red' }}>Passwords do not match</div>
                            )}
                            {confirmPassword && (
                                <div style={{ color: 'green' }}>Passwords is equal</div>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col>
                            <Form.Label>❤️Favourite film❤️</Form.Label>
                            <Form.Control name="favouriteFilm" placeholder="Example: Green Mile" onChange={handleChange} />
                        </Col>
                    </Row>
                    <div className="mb-3 mt-3 text-center">
                        <Button variant="primary" type="submit" className="mx-auto">
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;

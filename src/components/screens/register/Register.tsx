import React, { FC, useState, useEffect } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../register/custom.css';
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useUserAuth } from "../../../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore"
import { auth, db, } from '../../../lib/firebaseConfig';
import parsePhoneNumber from 'libphonenumber-js';
import { IProfileResponse } from "../../../interfaces/IAuth";
import ReCaptcha from "react-google-recaptcha"

interface IRegisterProps { };

const Register: FC<IRegisterProps> = () => {
    const initialFormData: IProfileResponse = {
        firstName: '',
        secondName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
        country: '',
        age: 18,
        phoneNumber: '',
        profileUrl: '',
        userId: '',
        favouriteFilm: '',
        emailVerified: false,
        dateOfBirth: ''
    };
    const [formData, setFormData] = useState<IProfileResponse>(initialFormData)
    const { signUp, user } = useUserAuth();
    const navigate = useNavigate();
    const [emailValidated, setEmailValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [lowerValidated, setLowerValidated] = useState(false);
    const [specValidated, setSpecValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);
    const [numbersValidated, setNumbersValidated] = useState(false);
    const [confirmPassword, setConfirmedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    useEffect(() => {
        console.log('formData оновлено:', formData);
    }, [formData]);

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
    };

    const handlePhoneChange = (value: string) => {
        const phoneNumber = parsePhoneNumber(value);
        if (phoneNumber) {
            setFormData(prevState => ({
                ...prevState,
                country: phoneNumber.country || '',
                phoneNumber: phoneNumber.number
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log('Variable updated:', { name, value });
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

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            age: parseInt(value)
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            dateOfBirth: value
        }));
        console.log('Variable updated:', value, '\nformdata: ', formData);
    };

    const handleNewDoc = async (userId: string) => {
        try {
            const docRef = doc(db, "users", userId);
            console.log('Document: ', docRef);
            await setDoc(docRef, formData)
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    const handlecaptchaValue = (value: any) => {
        console.log("Captcha: ", value);
        setCaptchaValue(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!captchaValue) {
            alert("Please, complete captcha");
            return;
        }
        try {
            if (formData.email && formData.password) {
                console.log("1:", auth);
                console.log("1:", user);
                await signUp(formData.email, formData.password); // Очікуємо завершення реєстрації
                console.log("3:", auth);
                console.log("3:", user);

                const currentUser = auth.currentUser;
                if (currentUser) {
                    const userId = currentUser.uid;
                    console.log("User ID:", userId);
                    formData.userId = userId;
                    await handleNewDoc(userId); // Очікуємо завершення створення документа
                    console.log("Document created:", formData);

                    setCaptchaValue(null);

                    navigate('/profile');
                } else {
                    throw new Error('User not authenticated');
                }
            } else {
                throw new Error('Email or password is missing');
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };


    // const setUid = async (value: string) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         uid: value
    //     }));
    // }

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
                            <Form.Select defaultValue={"Male"} name="gender" aria-label="Gender select" onChange={handleGenderChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="my-1">
                            <Form.Label>Country/Phone number</Form.Label>
                            <PhoneInput defaultCountry="ua" value={formData.phoneNumber} onChange={handlePhoneChange} />
                        </Col>
                        <Col sm={4} className="my-1">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name="age" readOnly value={formData.age} />
                            <Form.Range name="ageRange" min={12} max={130} onChange={handleAgeChange} defaultValue={formData.age}
                            />
                        </Col>
                        <Col sm={3} className="my-1">
                            <Form.Label>Date of birth</Form.Label>
                            <input
                                className="text-black p-2 rounded"
                                type="date"
                                defaultValue={formData.dateOfBirth}
                                onChange={handleDateChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
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
                        <ReCaptcha
                            onChange={handlecaptchaValue}
                            sitekey="6Ld-9LcpAAAAAP8awYDwC_EpPZqawv5Um7nqzQJI"
                        />
                        <Button variant="primary" type="submit" className="mx-auto" disabled={!confirmPassword}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;

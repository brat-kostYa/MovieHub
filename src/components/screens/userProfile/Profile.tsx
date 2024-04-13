import React, { FC, useEffect, useState } from 'react';
import { useUserAuth } from '../../../context/userAuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { IProfileResponse } from '../../../interfaces/IAuth';
import { Col, Container, FloatingLabel, Form, Row, Card, Button, InputGroup } from 'react-bootstrap';
import { db, storageRef } from '../../../lib/firebaseConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import parsePhoneNumber from 'libphonenumber-js';

const Profile: FC = () => {
    const { user, changeEmail, changePassword, logOut, updateUserProfilePhoto } = useUserAuth();
    const initialUserData: IProfileResponse = {
        firstName: '',
        secondName: '',
        lastName: '',
        gender: '',
        age: 18,
        country: '',
        phoneNumber: '',
        favouriteFilm: '',
        password: '',
        profileUrl: '',
        email: '',
        docId: '',
        userId: '',
        emailVerified: false,
        dateOfBirth: ''
    };

    const [userInfo, setUserInfo] = useState<IProfileResponse>(initialUserData);
    const [editMode, setEditMode] = useState(false);
    const [initialUserInfo, setInitialUserInfo] = useState<IProfileResponse>(initialUserData);
    const [emailValidated, setEmailValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [lowerValidated, setLowerValidated] = useState(false);
    const [specValidated, setSpecValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);
    const [numbersValidated, setNumbersValidated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    console.log(user)
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data() as IProfileResponse;
                        setUserInfo(userData);
                        setInitialUserInfo(userData);
                        console.log('User data fetched:', userData);
                    } else {
                        console.log('User document does not exist');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [user]);

    useEffect(() => {
        // Переконайтеся, що користувач ввійшов у систему
        if (!user && !redirected) {
            logOut();
            window.location.href = '/signin'; // Перенаправлення на сторінку входу, якщо користувач не ввійшов у систему
            setRedirected(true);
        }
    }, [user, redirected]);

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

        setUserInfo(prevState => ({
            ...prevState,
            password: value
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailValidated(emailPattern.test(value));
        handleChange(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log('Variable updated:', { name, value });
    };

    const handleEditModeToggle = () => {
        setEditMode(true); // Only turn edit mode on, don't toggle

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValidated(emailPattern.test(userInfo.email));

        // Перевіряємо валідність паролю
        const upper = new RegExp('(?=.*[A-Z])');
        const lower = new RegExp('(?=.*[a-z])');
        const number = new RegExp('(?=.*[0-9])');
        const spec = new RegExp('(?=.*[!@#\$%\^&\*()-_\+=])');
        const length = new RegExp('(?=.{6,})');

        setUpperValidated(upper.test(userInfo.password));
        setLowerValidated(lower.test(userInfo.password));
        setNumbersValidated(number.test(userInfo.password));
        setSpecValidated(spec.test(userInfo.password));
        setLengthValidated(length.test(userInfo.password));
    };

    const handleChangePassword = async (currentPassword: string, newPassword: string, email: string) => {
        if (user) {
            try {
                changePassword(currentPassword, newPassword, email);
            } catch (error) {
                console.log(error);
            }
        }

    };

    const handleChangeEmail = async (currentEmail: string, newEmail: string, password: string) => {
        if (user) {
            try {

                changeEmail(currentEmail, newEmail, password);

            } catch (error) {
                console.log(error);
            }
        }
    };


    const handleSaveChanges = async () => {
        if (user) {
            try {
                if (userInfo.email !== user.email) {
                    console.log("before email change: ", user.email, userInfo.email, initialUserInfo.password)
                    await handleChangeEmail(user.email || '', userInfo.email, initialUserInfo.password);
                }

                if (userInfo.password !== initialUserInfo.password) {
                    console.log("before password change: ", initialUserInfo.password, userInfo.password)
                    await handleChangePassword(initialUserInfo.password, userInfo.password, user.email || '');
                }

                const userInfoToUpdate: { [key: string]: any } = userInfo;

                if (!userInfoToUpdate.userId) {
                    userInfoToUpdate.userId = user.uid;
                }

                console.log("uid in doc in future: ", userInfoToUpdate.userId);

                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, userInfoToUpdate);
                await updateUserProfilePhoto(userInfoToUpdate.profileUrl)
                console.log('User info updated in the database:', userInfo);

                setEditMode(false);
            } catch (error) {
                console.error('Error updating user info in the database:', error);
            }
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            gender: value
        }));
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            age: parseInt(value)
        }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            console.log("File info: ", file);

            if (user) {
                try {
                    const photoRef = ref(storageRef, file.name);
                    await uploadBytes(photoRef, file);
                    const downloadURL = await getDownloadURL(photoRef);
                    setUserInfo(prevState => ({
                        ...prevState,
                        profileUrl: downloadURL
                    }));
                    console.log('Photo uploaded successfully:', downloadURL);
                } catch (error) {
                    console.error('Error uploading photo:', error);
                }
            }
        }
    };

    const handlePhoneChange = (value: string) => {
        const phoneNumber = parsePhoneNumber(value);
        if (phoneNumber) {
            setUserInfo(prevState => ({
                ...prevState,
                country: phoneNumber.country || '',
                phoneNumber: phoneNumber.number
            }));
            console.log(userInfo.country, userInfo.phoneNumber);
        }
    };

    const handleResetChanges = () => {
        console.log(initialUserInfo);
        setEditMode(false);
        setUserInfo(initialUserInfo);
        console.log(userInfo);
    };

    return (
        <Container className="py-5">
            <Row>
                <Col lg={4}>
                    <Card className="bg-success-subtle bg-gradient align-items-center mb-4">
                        <Card.Body className="text-center">
                            <Card.Img
                                className="rounded-circle"
                                src={selectedFile ? URL.createObjectURL(selectedFile) : (userInfo.profileUrl ? userInfo.profileUrl
                                    : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp")}
                                alt="user"
                                style={{ width: '150px', height: '150px', margin: 'auto' }}
                            />
                            <p className="fw-bold text-muted mb-1">{userInfo.firstName} {userInfo.lastName}</p>
                            <p className='fw-bold text-muted mb-1'>Date of birth: {userInfo.dateOfBirth}</p>
                            <Row className="d-inline">
                                <Button className="fw-bold text-warning w-auto my-2" variant="primary"
                                    onClick={handleEditModeToggle}>Edit profile</Button>
                                {editMode && (
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" accept=".svg, .jpeg, .png, image/*" onChange={handleFileSelect} />
                                    </Form.Group>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    {user && (
                        <Card className="bg-success-subtle bg-gradient">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <FloatingLabel controlId='firstName' label='First name'>
                                            <Form.Control type='text' name='firstName' defaultValue={userInfo.firstName}
                                                value={userInfo.firstName} onChange={handleChange} readOnly={!editMode} />
                                        </FloatingLabel>
                                    </Col>
                                    <hr />
                                    <Col className="mt-2">
                                        <FloatingLabel controlId='secondName' label='Second name'>
                                            <Form.Control type='text' name='secondName' defaultValue={userInfo.secondName}
                                                value={userInfo.secondName} onChange={handleChange} readOnly={!editMode} />
                                        </FloatingLabel>
                                    </Col>
                                    <hr />
                                    <Col className="mt-2">
                                        <FloatingLabel controlId='lastName' label='Last name'>
                                            <Form.Control type='text' name="lastName" defaultValue={userInfo.lastName}
                                                value={userInfo.lastName} onChange={handleChange} readOnly={!editMode} />
                                        </FloatingLabel>
                                    </Col>
                                    <hr />
                                    <Col className="mt-2">
                                        {!editMode && (
                                            <FloatingLabel controlId='age' label='Age'>
                                                <Form.Control min={12} max={130} type='text' name='age'
                                                    defaultValue={userInfo.age.toString()} value={userInfo.age}
                                                    onChange={handleChange} readOnly={!editMode} />
                                            </FloatingLabel>
                                        )}
                                        {editMode && (
                                            <FloatingLabel controlId='age' label='Age'>
                                                <Form.Control name="age" readOnly value={userInfo.age} />
                                                <Form.Range min={12} max={130} defaultValue={userInfo.age} value={userInfo.age}
                                                    onChange={handleAgeChange} />
                                            </FloatingLabel>
                                        )}

                                    </Col>
                                    <hr />
                                    <Col className="mt-2">
                                        {!editMode && (
                                            <FloatingLabel controlId='gender' label='Gender'>
                                                <Form.Control type='text' name='gender' defaultValue={userInfo.gender}
                                                    value={userInfo.gender} onChange={handleChange} readOnly={!editMode} />
                                            </FloatingLabel>
                                        )}
                                        {editMode && (
                                            <FloatingLabel controlId='gender' label='Genger'>
                                                <Form.Select defaultValue={userInfo.gender} name="gender" aria-label="Gender select"
                                                    onChange={handleGenderChange}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        )}
                                    </Col>
                                    <hr />
                                    <Col className="mt-2">

                                        <InputGroup>
                                            <FloatingLabel controlId='email' label='Email'>
                                                <Form.Control name="email" aria-describedby="basic-addon2" type="email"
                                                    value={userInfo.email} onChange={handleEmailChange}
                                                    defaultValue={userInfo.email} readOnly={!editMode} />
                                            </FloatingLabel>
                                            <InputGroup.Text id="basic-addon2">ex@example.com</InputGroup.Text>
                                        </InputGroup>
                                        {!emailValidated && editMode && (
                                            <div style={{ color: 'red' }}>Invalid email format!</div>
                                        )}
                                        {emailValidated && editMode && (
                                            <div style={{ color: 'green' }}>Email is required!</div>
                                        )}

                                    </Col>
                                    <hr />
                                    <Col className="mt-2">

                                        <InputGroup>
                                            <FloatingLabel controlId='password' label='Password'>
                                                <Form.Control name="password" type={showPassword ? "text" : "password"}
                                                    value={userInfo.password} defaultValue={userInfo.password}
                                                    onChange={(e) => handlePasswordChange(e.target.value)} readOnly={!editMode} />
                                            </FloatingLabel>
                                            {editMode && (
                                                <Button onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </Button>
                                            )}

                                        </InputGroup>
                                        {editMode && (
                                            <div className="flex tracker-box">
                                                <div style={{ padding: '5px' }} className={lowerValidated ? 'validated' :
                                                    'not-validated'}>
                                                    {lowerValidated ? '✔' : '❌'}
                                                    Low
                                                </div>
                                                <div style={{ padding: '5px' }} className={upperValidated ? 'validated' :
                                                    'not-validated'}>
                                                    {upperValidated ? '✔' : '❌'}
                                                    Up
                                                </div>
                                                <div style={{ padding: '5px' }} className={numbersValidated ? 'validated' :
                                                    'not-validated'}>
                                                    {numbersValidated ? '✔' : '❌'}
                                                    Num
                                                </div>
                                                <div style={{ padding: '5px' }} className={specValidated ? 'validated' :
                                                    'not-validated'}>
                                                    {specValidated ? '✔' : '❌'}
                                                    Spec
                                                </div>
                                                <div style={{ padding: '5px' }} className={lengthValidated ? 'validated' :
                                                    'not-validated'}>
                                                    {lengthValidated ? '✔' : '❌'}
                                                    Len
                                                </div>
                                            </div>
                                        )}

                                    </Col>
                                    <hr />
                                    <Col className="mt-2">
                                        {!editMode && (
                                            <div>
                                                <Form.Label className='text-muted'>Country/Phone</Form.Label>
                                                <PhoneInput value={userInfo.phoneNumber} onChange={handlePhoneChange} disabled={!editMode} />
                                            </div>

                                        )}
                                        {editMode && (
                                            <div className="z-3">
                                                <Form.Label className='text-muted'>Country/Phone</Form.Label>
                                                <PhoneInput value={userInfo.phoneNumber} onChange={handlePhoneChange} />
                                            </div>
                                        )}

                                    </Col>
                                    <hr />
                                    {/* <Col className="mt-2">
                                        {!editMode && (
                                            <FloatingLabel className='z-0' controlId='country' label='Country'>
                                                <Form.Control type='text' name='country'
                                                    onChange={handleChange} readOnly={!editMode} />
                                            </FloatingLabel>
                                        )}
                                        {editMode && (
                                            <div>
                                                <Form.Label className="text-muted">Country</Form.Label>
                                                <CountrySelector selectedCountry={userInfo.country} onSelect={handleCountryChange} />
                                            </div>
                                        )}

                                    </Col> */}
                                    <hr />
                                    <Col className="mt-2">
                                        <FloatingLabel className='z-0' controlId='favouriteFilm' label='FavouriteFilm'>
                                            <Form.Control type='text' name='favouriteFilm' defaultValue={userInfo.favouriteFilm}
                                                value={userInfo.favouriteFilm} onChange={handleChange} readOnly={!editMode} />
                                        </FloatingLabel>
                                    </Col>
                                    <hr />
                                    {editMode && (
                                        <Row className="mt-2 text-center">
                                            <Col>
                                                <Button variant="danger fw-bold text-warning" onClick={handleResetChanges}>
                                                    Cansel
                                                </Button>

                                                <Button
                                                    className="fw-bold mx-2 text-warning"
                                                    onClick={handleSaveChanges}
                                                >
                                                    Save changes
                                                </Button>
                                                {/* {!isEmailVerified && (
                                                    <div>
                                                        <Button
                                                            className="fw-bold mx-2 text-warning"
                                                            onClick={handleSendVerifyMessage}
                                                        >
                                                            Send verify message
                                                        </Button>
                                                        <div style={{ color: 'red' }}>Please verify your email</div>
                                                    </div>
                                                )} */}
                                            </Col>
                                        </Row>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
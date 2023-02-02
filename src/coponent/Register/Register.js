import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css'
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, sendEmailVerification, signInWithPopup, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';


const auth = getAuth(app);

function Register() {

    const facebookProvider = new FacebookAuthProvider();

    const [success, setSuccess] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');
    const [user, setUser] = useState({})

    const handleRegistration = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password, name);

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setErrorPassword('Please provide at lest tow Capital laters');
            return;
        }
        if (password.length < 6) {
            setErrorPassword('Please provide more than 6 digit');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setErrorPassword('Please provide at one special catechter');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                setErrorPassword('')
                form.reset();
                //update user
                updateUser(name);
                //verify email
                verifyEmail()
                setUser(user)
                //
            })
            .catch(error => {
                console.log('error:', error);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify your emaill ')
            });
    }

    const updateUser = (name, phone) => {
        updateProfile(auth.currentUser, {
            displayName: name, phoneNumber: phone
        }).then(() => {
            console.log('user updated successfully');

        }).catch((error) => {
            console.log(error);
        });
    }

    //facebook login
    const handleFacebookLogin = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                setUser(user);
            }).catch(error => console.error(error))

    }

    /*  const emailChange = (event) => {
         const email = event.target.value;
         console.log(email);
     } */


    return (
        <div className=' mx-auto my-5 w-50'>
            <h1 className='text-center text-primary'>Please Register </h1>
            <Form onSubmit={handleRegistration}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>

                    <Form.Control type="text" name="name" placeholder="Enter your Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" required placeholder="Password" />
                </Form.Group>


                <p className='text-danger'>{errorPassword}</p>

                {
                    success && <p className='text-success'>Registration successfull</p>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br />
                <Button onClick={handleFacebookLogin} variant="primary mt-3">
                    Facebook loign
                </Button>
            </Form>

            <p className='mt-4'><small>Already have an Accout ? <Link to='/login'>Go to Login</Link></small></p>

            <div className='mx-auto'>
                {user?.uid && <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user?.photoURL} />
                    <Card.Body>
                        <Card.Title>{user?.displayName}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{user?.email}</ListGroup.Item>
                        <ListGroup.Item>{user?.uid}</ListGroup.Item>
                        <ListGroup.Item>Use Display card</ListGroup.Item>
                    </ListGroup>
                </Card>}
            </div>

        </div>
    );
}

export default Register;
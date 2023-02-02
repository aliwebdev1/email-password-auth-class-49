import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

function Login() {
    const [userEmail, setUserEmail] = useState('')
    const [success, setSuccess] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
                form.reset();
            })
            .catch(error => {
                console.log('error:', error);
            })

    }

    const getEmailOnBlur = (event) => {
        const resetEmail = event.target.value;
        // console.log(resetEmail);
        setUserEmail(resetEmail)


    }

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Please check your email, rest password link already sent')
            })
            .catch(error => console.log(error))
    }


    return (
        <div className=' mx-auto my-5 w-50'>
            <h1 className='text-center text-primary'>Please Login </h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control onBlur={getEmailOnBlur} type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" required placeholder="Password" />
                </Form.Group>

                {
                    success && <p className='text-success'>Login successfull</p>
                }

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>

            <p className='mt-4'><small>I have no accout ? <Link to='/register'>Go to Registration</Link></small></p>
            <p className='mt-4'><small>Forget Password  <button onClick={handleForgetPassword} className='btn btn-link'>Please reset password</button></small></p>

        </div>
    );
}

export default Login;
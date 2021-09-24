import React, {useEffect, useState} from 'react'
import {Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ERROR_REQUEST, LOGIN_REQUEST} from "../../redux/types";
import {NavLink} from "react-router-dom";

const LoginModal = () => {

    const [modal, setModal] = useState(false)
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()
    const {errorMsg} = useSelector(state => state.auth)

    useEffect(() => {
        try {
            setLocalMsg(errorMsg)
        }catch (e) {
            console.log(e)
        }
    }, [errorMsg])

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal)
    }

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const {email, password} = form
        const user = {email, password}
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        })
    };

    return (
        <div>
            <NavLink onClick={handleToggle} to="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button onClick={onSubmit} color='dark' style={{marginTop: "2rem"}} className="">로그인</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginModal

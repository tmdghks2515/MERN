import React, {useCallback, useEffect, useState} from 'react'
import {Collapse, Container, Nav, Navbar, NavbarToggler, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import LoginModal from "../auth/LoginModal"
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT_REQUEST} from "../../redux/types"

const AppNavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user, userName, isAuthenticated} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logout = useCallback( () => {
        dispatch({
            type: LOGOUT_REQUEST
        })
    }, [dispatch])

    useEffect(() => {
        setIsOpen(!isOpen)
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
          <Navbar color="dark" dark expand="lg" className="sticky-top">
              <Container>
                  <Link to="/" className="m-auto text-white text-decoration-none" >
                      아난 블로그
                  </Link>
                  <NavbarToggler onClick={handleToggle}/>
                  <Collapse isOpen={isOpen} navbar>
                      <Nav className="m-auto d-flex justify-content-around">
                      {isAuthenticated ? (
                          <div>
                            <span className="text-white">{userName}</span>
                              <NavLink onClick={logout}>로그아웃</NavLink>
                          </div>
                          ) :
                          (
                              <div>
                                <LoginModal/>
                              </div>
                          )}
                      </Nav>

                  </Collapse>
              </Container>
          </Navbar>  
        </>
    )
}

export default AppNavBar
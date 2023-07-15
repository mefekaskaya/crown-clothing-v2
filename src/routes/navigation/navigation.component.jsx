import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.style.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="shop">
                        SHOP
                    </Link>

                    {currentUser ? (
                        <span onClick={signOutUser} className="nav-link">
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to="auth">
                            SIGN IN
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;

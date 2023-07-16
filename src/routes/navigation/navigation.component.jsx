import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { CartContext } from '../../contexts/cart.context';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
    NavigationContainer,
    NavLinkContainer,
    NavLinksContainer,
    LogoContainer
} from './navigation.style.js';
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLinkContainer to="shop">SHOP</NavLinkContainer>
                    {currentUser ? (
                        <NavLinkContainer as="span" onClick={signOutUser}>
                            SIGN OUT
                        </NavLinkContainer>
                    ) : (
                        <NavLinkContainer to="auth">SIGN IN</NavLinkContainer>
                    )}
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;

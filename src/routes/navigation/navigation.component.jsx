import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from 'src/store/cart/cart-selector';
import { signOutStart } from '../../store/user/user.action';

import {
    NavigationContainer,
    NavLinkContainer,
    NavLinksContainer,
    LogoContainer
} from './navigation.style.js';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOutUser = () => {
        dispatch(signOutStart());
    };
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

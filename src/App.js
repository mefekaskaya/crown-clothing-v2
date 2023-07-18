import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';

import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Spinner from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
    }, []);
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />}></Route>
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="auth" element={<Authentication />} />{' '}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;

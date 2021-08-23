import React from 'react';
import { NavLink } from 'react-router-dom';
// import PaymentForm from './PaymentForm';
import Button from '@material-ui/core/Button';

const AppRouter = () => (
    <div>
        <Button variant="contained">
            <NavLink to='/payments' activeClassName='active'>Pay</NavLink>
        </Button>
        
    </div>
)

export default AppRouter;

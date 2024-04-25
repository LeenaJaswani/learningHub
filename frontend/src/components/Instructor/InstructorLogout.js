import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('instructorLoginStatus');
        navigate('/instructor-login');
    }, [navigate]);

    return (
        <div>
            {/* You Have been logged out */}
        </div>
    );
};

export default InstructorLogout;

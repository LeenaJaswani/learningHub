import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('studentLoginStatus');
        navigate('/student-login');
    }, [navigate]);

    return (
        <div>
            {/* You Have been logged out */}
        </div>
    );
};

export default StudentLogout
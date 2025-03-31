// client/src/components/index.tsx

import React from 'react';

export const Header: React.FC = () => {
    return (
        <header>
            <h1>Welcome to TechSite</h1>
        </header>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} TechSite. All rights reserved.</p>
        </footer>
    );
};

// Export other components as needed
import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
    isPremiumUser: boolean;
    setPremiumUser: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPremiumUser, setIsPremiumUser] = useState(false); // False -> Hay anuncios | True -> No hay anuncios

    return(
        <UserContext.Provider value={{ isPremiumUser, setPremiumUser: setIsPremiumUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
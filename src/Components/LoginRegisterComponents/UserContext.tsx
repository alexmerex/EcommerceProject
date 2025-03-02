import React, { createContext, useState, ReactNode } from "react";

interface IUserContext {
    userId: string | null; // 🔹 Đổi tên từ getUserId → userId
    setUserId: (id: string) => void; // 🔹 Đổi tên từ setGetUserId → setUserId
}

const defaultValue: IUserContext = {
    userId: null,
    setUserId: () => { },
};

const UserType = createContext<IUserContext>(defaultValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <UserType.Provider value={{ userId, setUserId }}>
            {children}
        </UserType.Provider>
    );
};

export { UserType, UserProvider };

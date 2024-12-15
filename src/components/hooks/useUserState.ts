import { useState } from "react";
import { User } from "../types/User";

export const useUserState = () => {
    const [user, setUser] = useState<User>({ uid: "", userName: "" });
    const [users, setUsers] = useState<Array<User>>([]);

    const addUser = () => {
        const maxId = Math.max(0, ...users.map(user => Number(user.uid)));
        if (user.userName.length > 0) {
            const updatedUsers = [
                ...users.filter((existedUser) => existedUser.userName !== user.userName),
                { uid: String(maxId + 1), userName: user.userName }
            ];
            setUsers(updatedUsers);
        }
        setUser({ uid: "", userName: "" });
    };

    const deleteUser = (selectedUser: User) => {
        setUsers(users.filter(user => user.userName !== selectedUser.userName))
        setUser({ uid: "", userName: "" });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ uid: "", userName: e.target.value });
    }

    return { user, users, setUser, setUsers, addUser, deleteUser, handleChange }
}

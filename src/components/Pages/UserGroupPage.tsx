import { useNavigate } from 'react-router-dom';
import { LabeledInputButton } from '../molcules/LabeledInputButton';
import { useUserProfileManager } from '../hooks/useUserProfileManager';
import { useUserState } from '../hooks/useUserState';
import { PillWithButton } from '../molcules/PillWithButton';
import { CrossIcon } from '../image/CrossIcon';
import { PositiveButton } from '../atoms/PositiveButton';
import { useEffect, useState } from 'react';
import { useGroup } from '../provider/GroupProvider';
import { NegativeButton } from '../atoms/NegativeButton';
import { Loading } from '../organisms/Loadning';
import { useFetchData } from '../hooks/useFetchData';

export const UserGroupPage = () => {

    const { readUsers, createUsers, updateUsers } = useUserProfileManager();
    const { user, users, setUsers, addUser, deleteUser, handleChange } = useUserState();
    const navigate = useNavigate();
    const { group } = useGroup();
    const [loading, setLoading] = useState(true);
    const { fetchData } = useFetchData();

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            await fetchData([readUsers()]);
            setUsers(group);
            setLoading(false);
        };

        if (window.location.pathname.includes("user")) {
            fetchDataAsync();
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [])

    const handleClick = () => {
        if (users.length <= 1) {
            alert("2人以上入力してください");
            return
        }
        if (window.location.pathname.includes("user")) {
            updateUsers(users);
            navigate(-1);
        } else {
            const uuid = window.crypto.randomUUID();
            createUsers(uuid, users);
            navigate(`../${uuid}/group`);
        }
    }
    return (
        <div className=''>
            <Loading loading={loading}>
                <div className='py-4'>
                    <LabeledInputButton
                        type="text"
                        label="メンバー"
                        placeholder='ゆうた'
                        value={user.userName}
                        onChange={handleChange}
                        onClick={addUser}
                    >
                        追加
                    </LabeledInputButton>
                    <div className='flex flex-grow flex-wrap'>
                        {users.map((user) => (
                            <PillWithButton key={user.userName} label={user.userName} onClick={() => deleteUser(user)} ><CrossIcon className='' /></PillWithButton>
                        ))}
                    </div>
                    {window.location.pathname.includes("user") ? (
                        <div>
                            <PositiveButton onClick={handleClick} className="w-full rounded-md ">更新する</PositiveButton>
                            <NegativeButton onClick={() => navigate(-1)} className="mt-3 w-full">戻る</NegativeButton>
                        </div>
                    ) : (
                        <PositiveButton onClick={handleClick} className="w-full rounded-md ">グループを作成</PositiveButton>

                    )
                    }
                </div>
            </Loading>
        </div>
    );
}

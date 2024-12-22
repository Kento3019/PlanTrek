import { useMemo } from 'react';
import { InputButton } from '../molcules/InputButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useCopyClicpBorad } from '../hooks/useCopyClipBorad';
import { PositiveButton } from '../atoms/PositiveButton';
import { CircleCheckIcon } from '../image/CircleCheckIcon';

export const LinkCreationPage = () => {

    const { uuid } = useParams();
    const navigate = useNavigate();
    const { isCopid, copyTextToClipbord } = useCopyClicpBorad();

    const IssuedURI = useMemo(() => (
        `${window.location.protocol}//${window.location.host}/${uuid}/schedule`
    ), [uuid])

    const handleClick = () => {
        navigate(`../${uuid}/schedule`)
    }

    return (
        <>
            <div className='flex items-center justify-center py-8'>
                <CircleCheckIcon size={64} color='#4f46e5' />
            </div>
            <div className="text-center py-4">
                <h3 className="text-xl font-extrabold tracking-tight text-gray-800">
                    グループを作成しました！
                </h3>
                <p className="mt-2 text-gray-600">
                    まずはグループページのURLをコピーして、<br />
                    LINEなどでメンバーに共有しましょう。
                </p>
            </div>
            <div className='py-4'>
                <InputButton
                    type="text"
                    placeholder='URL'
                    value={IssuedURI}
                    onClick={() => copyTextToClipbord(IssuedURI)}>
                    {isCopid ? "Copyid!" : "Copy"}
                </InputButton>
                <PositiveButton onClick={handleClick} className="w-full rounded-md ">グループページへ進む</PositiveButton></div>

        </>
    );
}

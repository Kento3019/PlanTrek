import { useMemo } from 'react';
import { InputButton } from '../molcules/InputButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useCopyClicpBorad } from '../hooks/useCopyClipBorad';
import { PositiveButton } from '../atoms/PositiveButton';

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
            <div className='py-4'>
                <InputButton
                    type="text"
                    placeholder='URL'
                    value={IssuedURI}
                    onClick={() => copyTextToClipbord(IssuedURI)}>{
                        isCopid ? "Copyid!" : "Copy"
                    }
                </InputButton>
                <PositiveButton onClick={handleClick} className="w-full rounded-md ">グループページに進む</PositiveButton></div>

        </>
    );
}

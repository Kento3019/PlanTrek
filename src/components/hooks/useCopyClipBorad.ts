import { useState } from 'react';

export const useCopyClicpBorad = () => {
    const [isCopid, setIsCopid] = useState<boolean>(false);

    const copyTextToClipbord = (text: string) => {
        if (!isCopid) {
            navigator.clipboard.writeText(text).then(() => {
                setIsCopid(!isCopid);
                alert("コピーが完了しました")
            })
        }
    }
    return { isCopid, copyTextToClipbord }
}

type Props = {
    checked: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
};

export default function Switch({ checked, onChange, name }: Props) {

    return (
        <>
            <input
                id="switch"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <label
                htmlFor="switch"
                className={`relative flex items-center w-[2.5em] h-[1.25em] cursor-pointer rounded-full transition-colors duration-200
            ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
                <span
                    className={`absolute w-[1em] h-[1em] bg-white rounded-full transition-all duration-200
              ${checked ? 'left-[1.4em]' : 'left-[0.15em]'}`}
                ></span>
            </label>
        </>
    );
}

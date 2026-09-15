import { useState } from 'react';
import PlusIcon from '../assets/plus_icon.svg';
import MinusIcon from '../assets/minus_icon.svg';

interface WorkingProgressBoxProps {
    id: number;
    title: string;
    description: string;
}

const WorkingProgressBox = ({ id, title, description }: WorkingProgressBoxProps) => {
    const [opened, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!opened);

    const handleClick = () => {
        toggleOpen();
        
    };

    return (
        <div className={`w-full ${opened ? 'bg-blue' : 'bg-light-gray'} px-10 md:px-14 py-10 rounded-[45px] shadow-[0px_5px_0px_0px_rgba(25,26,35,1.00)] outline-1 outline-offset-[-1px] outline-zinc-900 inline-flex flex-col justify-start items-start gap-7`}>
            <div className="flex flex-row items-center justify-between w-full gap-2 md:gap-0">
                    <div className="flex flex-row items-center gap-5 md:gap-10">
                        <p className="text-4xl md:text-6xl font-medium">{id}</p>
                        <h2 className="text-2xl md:text-3xl font-medium w-[200px] md:w-full">{title}</h2>
                    </div>
                    <button onClick={handleClick} className="size-[50px]">
                        <img 
                            src={opened ? MinusIcon : PlusIcon} 
                            alt={opened ? 'Close' : 'Open'}
                            className="size-[50px]"
                        />   
                    </button>
            </div>
            {opened && (
                <>
                    <div className="w-full border-1 border-black" />
                    <p className="text-lg font-normal">{description}</p>
                </>
            )}
        </div>
    );
}

export default WorkingProgressBox;
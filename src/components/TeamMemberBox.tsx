import { Polygon } from "@html-polygon/react";
import LinkedInIcon from '../assets/linkedin_logo_black.svg';

const TeamMemberBox = ({ name, position, image, link}: TeamMemberProps) => {
    return (
        <div className="w-full h-fit px-9 py-10 bg-white rounded-[45px] shadow-[0px_5px_0px_0px_rgba(25,26,35,1.00)] outline-1 outline-offset-[-1px] outline-zinc-900 flex flex-col sm:flex-row justify-start items-start gap-2.5">
            <div className="self-center">
                <Polygon
                    sides={11}
                    padding={5}
                    borderWidth={1}
                    borderColor="rgba(25,26,35,1.00)"
                    className={`size-25`}
                    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start">
                <a href={link} target="_blank" className="self-center sm:self-end"><img src={LinkedInIcon} alt="LinkedIn" /></a>
                <h3 className="text-xl font-semibold mt-2">{name}</h3>
                <p className="text-gray-600">{position}</p>
            </div>
            
        </div>
    );
}

interface TeamMemberProps {
    name: string;
    position: string;
    image: string;
    link: string;
}

export default TeamMemberBox;
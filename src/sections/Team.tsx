import TeamMemberBox from '../components/TeamMemberBox';
import teamMembers from '../assets/files/team.json';
import { useState } from 'react';

const Team = () => {
    const [expanded, setExpanded] = useState(false);
    const isMobile = window.innerWidth < 768;
    let teamMembersToShow = 6;
    if (isMobile) {
        teamMembersToShow = 4;
    }else {
        teamMembersToShow = 6;
    }

    return (
        <section className="w-full flex flex-col gap-10" id="team">
            <div className="w-full flex flex-col md:flex-row items-center justify-start gap-5 my-10">
                <h2 className="text-4xl font-medium px-1.5 bg-blue-400 rounded-md w-fit">Our Team</h2>
                <p className="mt-2 text-center md:text-left">Meet the talented individuals behind our success.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {
                    teamMembers.slice(0, teamMembersToShow).map((member, index) => (
                        <TeamMemberBox
                            key={index}
                            name={member.name}
                            position={member.position}
                            image={member.image}
                            link={member.link}
                        />
                    ))
                }
                {expanded && teamMembers.slice(teamMembersToShow).map((member, index) => (
                    <TeamMemberBox
                        key={index + teamMembersToShow}
                        name={member.name}
                        position={member.position}
                        image={member.image}
                        link={member.link}
                    />
                ))}
            </div>
            {teamMembers.length > teamMembersToShow && (
                    <button
                        className="w-fit px-9 py-5 bg-zinc-900 text-white rounded-2xl text-xl self-center sm:self-end"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show Less' : 'See all team members'}
                    </button>
            )}
        </section>
    );
}

export default Team;
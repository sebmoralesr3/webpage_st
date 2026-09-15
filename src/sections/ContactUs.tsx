import Ilustration from '../assets/Ilustration.svg';

const ContactUs = () => {
    return (
        <section className="w-full mb-20" id="contact-us">
            <div className="w-full flex flex-col md:flex-row items-center justify-start gap-5 my-10">
                <h2 className="text-4xl font-medium px-1.5 bg-blue rounded-md w-fit">Contact Us</h2>
                <p className="mt-2">Connect with Us: Let's Talk!</p>
            </div>
            <div className="w-full flex flex-row items-center justify-center gap-10 bg-light-gray py-10 rounded-[45px]">
                <div className="flex flex-col gap-5 w-full md:w-2/3 px-10 md:px-36">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name" className="text-base font-normal">Name</label>
                        <input type="text" id="name" className=" px-7 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-black" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-base font-normal">Email</label>
                        <input type="email" id="email" className=" px-7 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-black" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="message" className="text-base font-normal">Message</label>
                        <textarea id="message" className=" px-7 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-black"></textarea>
                    </div>
                    <button className="bg-blue-dark text-white px-9 py-5 rounded-2xl hover:bg-light-black transition-all duration-300">
                        Send Message
                    </button>
                </div>
                <div className="hidden md:flex w-1/3 items-end justify-end">
                    <img src={Ilustration} className="w-[70%]"/>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
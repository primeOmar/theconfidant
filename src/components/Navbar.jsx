import React, { useEffect } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";


const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('/');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const navLinks = (
        <ul className='font-medium flex flex-col md:flex-row lg:space-x-6 sm:space-x-4 space-y-2 md:space-y-0 p-4 md:p-0'>
            {['home', 'Blog', 'about'].map((section) => (
                <li key={section}>
                    <a
                        href={`#${section}`}
                        className={`text-white ${activeSection === section ? 'isActive' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <header className='font-body bg-dark-500 text-white py-6 px-4 fixed top-0 left-0 right-0 z-30'>
            <div className='container mx-auto flex justify-between items-center h-full'>
                <a href="/">
                    <h1 className='text-2xl font-bold'>The <span className='text-green-700 text-shadow-emerald-950'>Conf</span>idant</h1>
                </a>
                <div className='hidden md:flex flex-grow justify-center'>
                    <nav>{navLinks}</nav>
                </div>
                <div className='hidden md:block'>
                    <a href="#contact" className='text-white bg-para hover:bg-green-800 px-4 py-2 rounded transition-colors duration-300'>
                        Contact Us
                    </a>
                </div>
               <div className='block md:hidden'>
  <button
    onClick={handleToggle}
    className="text-white focus:outline-none flex items-center justify-center"
  >
    {isOpen ? <FaTimes size={35} className="z-50 text-white" /> : <FiAlignJustify size={35} className="text-white" />}

  </button>
</div>

            </div>

            {/* Backdrop and mobile nav */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black bg-opacity-60 z-20" onClick={handleToggle}></div>

                    {/* Slide-in mobile nav */}
                    <nav className="fixed top-0 left-0 w-full h-full bg-dark-500 z-30 pt-20 px-6 overflow-y-auto">
                         <ul className='flex flex-col items-center justify-center h-full space-y-6 text-2xl'>
                            {navLinks.props.children}
                            <li>
                                <a href="#contact" className='text-white bg-para hover:bg-green-800 px-4 py-2 rounded'>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </header>
    );
};

export default Navbar;

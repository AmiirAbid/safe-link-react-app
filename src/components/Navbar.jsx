import {useEffect, useState} from "react";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-cyan-500/20' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="flex items-center space-x-2">
                        <img src="/safelink-logo.png" alt="SafeLink" className="w-8 h-8 text-[#6abaca]" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#6abaca] to-cyan-300 bg-clip-text text-transparent">
              SafeLink
            </span>
                    </a>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-[#6abaca] transition-colors">Features</a>
                        <a href="#solutions" className="text-gray-300 hover:text-[#6abaca] transition-colors">Solutions</a>
                        <a href="#contact" className="text-gray-300 hover:text-[#6abaca] transition-colors">Contact</a>
                        <a href="/auth"><button className="px-6 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/50">
                            Get Started
                        </button></a>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-cyan-500/20">
                    <div className="px-4 py-4 space-y-4">
                        <a href="#features" className="block text-gray-300 hover:text-[#6abaca]">Features</a>
                        <a href="#solutions" className="block text-gray-300 hover:text-[#6abaca]">Solutions</a>
                        <a href="#contact" className="block text-gray-300 hover:text-[#6abaca]">Contact</a>
                        <button className="w-full px-6 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
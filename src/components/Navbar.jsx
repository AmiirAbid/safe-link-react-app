import {useState} from "react";
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-8 h-8 text-[#6abaca]" />
                        <span className="text-2xl font-bold text-slate-900">SafeLink</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-slate-600 hover:text-[#6abaca] transition">Features</a>
                        <a href="#solutions" className="text-slate-600 hover:text-[#6abaca] transition">Solutions</a>
                        <a href="#about" className="text-slate-600 hover:text-[#6abaca] transition">About</a>
                        <a href="#contact" className="text-slate-600 hover:text-[#6abaca] transition">Contact</a>
                        <Button className="bg-[#6abaca] hover:bg-[#5aa9b9] text-white">
                            Get Started
                        </Button>
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-4 space-y-3">
                        <a href="#features" className="block text-slate-600 hover:text-[#6abaca]">Features</a>
                        <a href="#solutions" className="block text-slate-600 hover:text-[#6abaca]">Solutions</a>
                        <a href="#about" className="block text-slate-600 hover:text-[#6abaca]">About</a>
                        <a href="#contact" className="block text-slate-600 hover:text-[#6abaca]">Contact</a>
                        <Button className="w-full bg-[#6abaca] hover:bg-[#5aa9b9] text-white">
                            Get Started
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
import React from "react";

const Footer = () => {
    return (
        <footer className="relative py-11 px-4 border-t border-cyan-500/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="/safelink-logo.png" alt="SafeLink" className="w-6 h-6 text-[#6abaca]" />
                            <span className="text-xl font-bold text-white">SafeLink</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Enterprise-grade security solutions for modern networks.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Documentation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-[#6abaca] transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-cyan-500/20 text-center text-gray-400 text-sm">
                    © 2024 SafeLink. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
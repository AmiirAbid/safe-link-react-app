import React, { useState, useEffect } from 'react';
import { Shield, Lock, Zap, Network, ChevronRight, Menu, X, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground.jsx';

// Navigation Component
const Navigation = () => {
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
                    <div className="flex items-center space-x-2">
                        <Shield className="w-8 h-8 text-[#6abaca]" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#6abaca] to-cyan-300 bg-clip-text text-transparent">
              SafeLink
            </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-[#6abaca] transition-colors">Features</a>
                        <a href="#solutions" className="text-gray-300 hover:text-[#6abaca] transition-colors">Solutions</a>
                        <a href="#security" className="text-gray-300 hover:text-[#6abaca] transition-colors">Security</a>
                        <button className="px-6 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/50">
                            Get Started
                        </button>
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
                        <a href="#security" className="block text-gray-300 hover:text-[#6abaca]">Security</a>
                        <button className="w-full px-6 py-2 bg-[#6abaca] text-slate-950 rounded-lg font-semibold">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Hero Section
const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in">
                    <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                        <span className="text-[#6abaca] text-sm font-semibold">Next-Gen Network Security</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-[#6abaca] bg-clip-text text-transparent">
                        Secure Your Network
                        <br />
                        <span className="text-[#6abaca]">Against Any Threat</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                        Enterprise-grade security solutions that protect your infrastructure with AI-powered threat detection and real-time monitoring.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group px-8 py-4 bg-[#6abaca] text-slate-950 rounded-lg font-semibold text-lg hover:bg-cyan-400 transition-all hover:shadow-xl hover:shadow-cyan-500/50 flex items-center justify-center">
                            Start Free Trial
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-[#6abaca] text-[#6abaca] rounded-lg font-semibold text-lg hover:bg-[#6abaca]/10 transition-all">
                            Watch Demo
                        </button>
                    </div>
                </div>

                <div className="mt-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                    <div className="relative p-8 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: Shield, label: 'Protected', value: '10M+' },
                                { icon: Lock, label: 'Threats Blocked', value: '2.5B+' },
                                { icon: Eye, label: 'Uptime', value: '99.99%' },
                                { icon: Zap, label: 'Response Time', value: '<1ms' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <stat.icon className="w-8 h-8 text-[#6abaca] mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Features Section
const Features = () => {
    const features = [
        {
            icon: Shield,
            title: 'Advanced Firewall',
            description: 'Multi-layered protection with intelligent packet inspection and automatic threat response.'
        },
        {
            icon: Lock,
            title: 'Zero-Trust Security',
            description: 'Implement zero-trust architecture with continuous verification and least-privilege access.'
        },
        {
            icon: Network,
            title: 'Network Monitoring',
            description: 'Real-time visibility into all network traffic with AI-powered anomaly detection.'
        },
        {
            icon: Zap,
            title: 'Instant Response',
            description: 'Automated threat mitigation with sub-second response times to neutralize attacks.'
        },
        {
            icon: Eye,
            title: 'Threat Intelligence',
            description: 'Stay ahead of emerging threats with our global threat intelligence network.'
        },
        {
            icon: AlertTriangle,
            title: 'Intrusion Prevention',
            description: 'Proactive IPS system that stops attacks before they reach your infrastructure.'
        }
    ];

    return (
        <section id="features" className="relative py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Enterprise Security <span className="text-[#6abaca]">Features</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Comprehensive security solutions designed for modern infrastructure
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-6 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl hover:border-[#6abaca] transition-all hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
                        >
                            <feature.icon className="w-12 h-12 text-[#6abaca] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// CTA Section
const CTA = () => {
    return (
        <section className="relative py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="relative p-12 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>

                    <div className="relative text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Ready to Secure Your Network?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Join thousands of enterprises protecting their infrastructure with SafeLink
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-[#6abaca] text-slate-950 rounded-lg font-semibold text-lg hover:bg-cyan-400 transition-all hover:shadow-xl hover:shadow-cyan-500/50">
                                Start Your Free Trial
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-[#6abaca] text-[#6abaca] rounded-lg font-semibold text-lg hover:bg-[#6abaca]/10 transition-all">
                                Contact Sales
                            </button>
                        </div>

                        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#6abaca] mr-2" />
                                No credit card required
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#6abaca] mr-2" />
                                14-day free trial
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer
const Footer = () => {
    return (
        <footer className="relative py-12 px-4 border-t border-cyan-500/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Shield className="w-6 h-6 text-[#6abaca]" />
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

// Main App Component
export default function App() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white">
            <AnimatedBackground />
            <Navigation />
            <main className="relative z-10">
                <Hero />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
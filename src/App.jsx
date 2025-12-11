import React from 'react';
import { Shield, Lock, Globe, Zap, CheckCircle, ArrowRight, Server, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const App = () => {

    const features = [
        {
            icon: <Shield className="w-12 h-12 text-[#6abaca]" />,
            title: "Advanced Threat Protection",
            description: "Real-time monitoring and protection against cyber threats with AI-powered detection systems."
        },
        {
            icon: <Lock className="w-12 h-12 text-[#6abaca]" />,
            title: "End-to-End Encryption",
            description: "Military-grade encryption protocols to secure all data transmissions across your network."
        },
        {
            icon: <Globe className="w-12 h-12 text-[#6abaca]" />,
            title: "Network Security",
            description: "Comprehensive network security solutions including firewalls, VPNs, and intrusion detection."
        },
        {
            icon: <Zap className="w-12 h-12 text-[#6abaca]" />,
            title: "Rapid Response",
            description: "24/7 security operations center with instant threat response and mitigation protocols."
        },
        {
            icon: <Server className="w-12 h-12 text-[#6abaca]" />,
            title: "Infrastructure Security",
            description: "Secure your entire infrastructure with enterprise-grade security solutions and monitoring."
        },
        {
            icon: <Eye className="w-12 h-12 text-[#6abaca]" />,
            title: "Continuous Monitoring",
            description: "Round-the-clock surveillance of your network with automated anomaly detection."
        }
    ];

    const solutions = [
        {
            title: "Enterprise Security Suite",
            features: ["Firewall Management", "Intrusion Prevention", "VPN Solutions", "Access Control"],
            price: "Custom"
        },
        {
            title: "Cloud Security",
            features: ["Cloud Infrastructure Protection", "Data Loss Prevention", "Compliance Management", "Security Audits"],
            price: "Custom"
        },
        {
            title: "Managed Security Services",
            features: ["24/7 SOC Monitoring", "Incident Response", "Vulnerability Management", "Security Consulting"],
            price: "Custom"
        }
    ];

    const stats = [
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "10M+", label: "Threats Blocked Daily" },
        { value: "500+", label: "Enterprise Clients" },
        { value: "<2min", label: "Average Response Time" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Navigation */}

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-[#6abaca]/10 px-4 py-2 rounded-full mb-6">
                            <AlertTriangle className="w-4 h-4 text-[#6abaca]" />
                            <span className="text-sm font-medium text-[#6abaca]">Trusted by 500+ enterprises worldwide</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                            Secure Your Network.<br />
                            <span className="text-[#6abaca]">Protect Your Future.</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Enterprise-grade security solutions that safeguard your digital infrastructure against evolving cyber threats. Deploy with confidence, scale with ease.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#6abaca] hover:bg-[#5aa9b9] text-white text-lg px-8">
                                Request Demo <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-[#6abaca] text-[#6abaca] hover:bg-[#6abaca] hover:text-white text-lg px-8">
                                View Solutions
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-[#6abaca] mb-2">{stat.value}</div>
                                <div className="text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Comprehensive Security Solutions
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Everything you need to protect your network infrastructure from modern cyber threats
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-2 hover:border-[#6abaca] transition-all hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4">{feature.icon}</div>
                                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Tailored Security Solutions
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Choose the perfect security package for your organization's needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => (
                            <Card key={index} className="hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-2xl mb-2">{solution.title}</CardTitle>
                                    <div className="text-3xl font-bold text-[#6abaca]">{solution.price}</div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {solution.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-[#6abaca] mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="w-full mt-6 bg-[#6abaca] hover:bg-[#5aa9b9] text-white">
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#6abaca] to-[#5aa9b9]">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Secure Your Network?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join hundreds of enterprises that trust SafeLink to protect their digital infrastructure
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-[#6abaca] hover:bg-slate-100 text-lg px-8">
                            Schedule Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Shield className="w-8 h-8 text-[#6abaca]" />
                                <span className="text-2xl font-bold">SafeLink</span>
                            </div>
                            <p className="text-slate-400">
                                Enterprise security solutions for the modern digital infrastructure.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Solutions</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-[#6abaca] transition">Network Security</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Cloud Security</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Managed Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-[#6abaca] transition">About Us</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Careers</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-[#6abaca] transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-[#6abaca] transition">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
                        <p>&copy; 2025 SafeLink. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
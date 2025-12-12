import React, { useEffect, useRef } from 'react';
import { 
  Shield, Lock, Zap, Network, ChevronRight, Eye, AlertTriangle, Globe, Users, Server, Cpu, ShieldCheck
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
// Hook personnalisé pour les animations au défilement
const useScrollAnimation = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return ref;
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

// Solutions Section
const Solutions = () => {
  const ref = useScrollAnimation();
  
  const solutions = [
    {
      icon: Globe,
      title: 'Global Network Protection',
      description: 'Protect your distributed workforce with cloud-native security that follows your users anywhere.',
      features: ['Global CDN Integration', 'Geo-fencing', 'Multi-region Deployment']
    },
    {
      icon: Server,
      title: 'Data Center Security',
      description: 'Comprehensive protection for on-premise infrastructure with hybrid cloud support.',
      features: ['Hardware Integration', 'Virtual Appliance', 'Hybrid Cloud Ready']
    },
    {
      icon: Users,
      title: 'Team Collaboration Security',
      description: 'Secure collaboration tools with end-to-end encryption and access control.',
      features: ['SSO Integration', 'Role-based Access', 'Audit Logging']
    },
    {
      icon: Cpu,
      title: 'IoT & Edge Security',
      description: 'Specialized protection for IoT devices and edge computing environments.',
      features: ['Device Authentication', 'Edge Firewall', 'Real-time Monitoring']
    }
  ];

  return (
    <section id="solutions" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <span className="text-[#6abaca] text-sm font-semibold">Tailored Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Industry-Specific <span className="text-[#6abaca]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Custom security solutions designed for your unique business needs
          </p>
        </div>
        
        <div ref={ref} className="opacity-0">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="group p-8 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl hover:border-[#6abaca] transition-all hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <solution.icon className="w-8 h-8 text-[#6abaca]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <ShieldCheck className="w-4 h-4 text-[#6abaca] mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const ref = useScrollAnimation();

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="opacity-0">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <span className="text-[#6abaca] text-sm font-semibold">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Contact <span className="text-[#6abaca]">Our Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to transform your security infrastructure? Let's talk.
            </p>
          </div>
          
       
          <div className="flex justify-center">
                       
            
            {/* Contact Form */}
            <div className="w-3xl p-8 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur border border-cyan-500/20 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-1 focus:ring-[#6abaca] transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-1 focus:ring-[#6abaca] transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-1 focus:ring-[#6abaca] transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-1 focus:ring-[#6abaca] transition-all"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-1 focus:ring-[#6abaca] transition-all"
                    placeholder="Tell us about your security needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#6abaca] to-cyan-600 text-slate-950 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white">
            <AnimatedBackground />
            <main className="relative z-10">
                <Hero />
                <Features />
                <Solutions />
                <Contact />
            </main>
        </div>
    );
}
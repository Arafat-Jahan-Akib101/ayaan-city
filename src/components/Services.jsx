import { Home, Building2, Map, ShieldCheck } from 'lucide-react';

const services = [
  { title: "Residential Development", icon: <Home />, desc: "Expertly planned residential living spaces." },
  { title: "Commercial Development", icon: <Building2 />, desc: "Premium commercial hubs for your business." },
  { title: "Land Development", icon: <Map />, desc: "100% legal land plots with clear documentation." },
  { title: "Quality Construction", icon: <ShieldCheck />, desc: "Modern architectural designs and reliable builds." }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900">Our Core Services</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="text-blue-600 mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


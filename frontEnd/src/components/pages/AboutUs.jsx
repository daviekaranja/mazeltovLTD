import React from "react";

const team = [
  {
    name: "Duncan Njuguna",
    title: "CEO & Founder",
    image: "https://i.postimg.cc/P55B7YP3/dan.jpg",
    bio: `Duncan is a visionary leader with over 6 years of experience in the financial services industry. As the Founder and CEO of Mazeltov, he has been instrumental in establishing the company as a trusted partner for individuals and businesses seeking quick, reliable loans on items.`,
  },
  {
    name: "Dorcas Naita",
    title: "Co-Founder",
    image: "https://i.postimg.cc/wj4SYMN6/dorcas.jpg",
    bio: `Dorcas is a dynamic and innovative leader who has played a pivotal role in the growth and development of Mazeltov Commercial Agency. As the Co-Founder, Dorcas has been at the forefront of driving the company’s mission to provide accessible loan solutions to individuals and businesses.`,
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          About Us
        </h1>
        <p className="text-xl text-gray-600">
          Empowering your financial journey with trust, innovation, and partnership.
        </p>
      </div>

      {/* Company Profile */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Company Profile
          </h2>
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Mazeltov Commercial Agency Ltd</span> specializes in providing corporate and individual loans backed by movable property. Our mission is to empower people and organizations with prompt, flexible, and affordable financial solutions.
          </p>
          <p className="text-gray-700">
            We are proud partners of <span className="font-semibold">Airtel Kenya</span>, enabling us to offer a wide range of Airtel products and services for seamless connectivity and communication across the country.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-8 flex flex-col items-center">
          <svg className="w-10 h-10 text-green-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Our Vision</h3>
          <p className="text-gray-700 text-center">
            To be Kenya’s most trusted and preferred commercial agency, offering loans and high-quality products and services with ease.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-8 flex flex-col items-center">
          <svg className="w-10 h-10 text-green-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Our Mission</h3>
          <p className="text-gray-700 text-center">
            To provide quick and reliable financial solutions and products that empower our clients to overcome challenges and seize opportunities.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-200 mb-4 shadow"
              />
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-green-700 font-medium mb-2">{member.title}</p>
              <p className="text-gray-600 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col mb-8 bg-slate-50 space-y-8">
      {/* Header Section */}
      <div className="bg-white text-gray-800 py-12 text-center">
        <h1 className="text-4xl font-semibold mb-4">About Us</h1>
        <p className="text-lg text-gray-800">
          Telling our inspiring story from the very beginning to our days
        </p>
      </div>

      {/* Company Profile Section */}
      <section className="px-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            Company Profile
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Mazeltov Commercial Agency Ltd specializes in providing corporate
            and individual loans that are backed by movable property. Our goal
            is to enable people and organizations by offering prompt, adaptable,
            and reasonably priced financial solutions to address their pressing
            needs.
          </p>
          <p className="text-lg text-gray-700">
            Mazeltov is also proud to be an official partner of Airtel Kenya,
            one of the country's leading telecommunications providers. This
            collaboration allows us to offer Kenyans a wide range of Airtel
            products and services, ensuring connectivity and communication
            solutions for all.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Our Vision
            </h3>
            <p className="text-lg text-gray-700">
              To be the most trusted and preferred commercial agency to offer
              both loans and high-quality products and services with ease in
              Kenya.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700">
              To provide quick and reliable financial solutions and products
              that empower our clients to overcome financial challenges and
              seize opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <div className="px-6">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Duncan Njuguna
            </h3>
            <p className="text-lg text-gray-700 mb-4">CEO and Founder</p>
            <p className="text-md text-gray-600 mb-4">
              Duncan is a visionary leader with over 6 years of experience in
              the financial services industry. As the Founder and CEO of
              Mazeltov, he has been instrumental in establishing the company as
              a trusted partner for individuals and businesses seeking quick,
              reliable loans on items.
            </p>
            <img
              className="rounded-lg max-w-full h-60 object-cover mt-4"
              src="https://i.postimg.cc/P55B7YP3/dan.jpg"
              alt="Duncan Njuguna"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Dorcas Naita
            </h3>
            <p className="text-lg text-gray-700 mb-4">Co-Founder</p>
            <p className="text-md text-gray-600 mb-4">
              Dorcas is a dynamic and innovative leader who has played a pivotal
              role in the growth and development of Mazeltov Commercial Agency.
              As the Co-Founder, Dorcas has been at the forefront of driving the
              company’s mission to provide accessible loan solutions to
              individuals and businesses.
            </p>
            <img
              className="rounded-lg max-w-full h-60 object-cover mt-4"
              src="https://i.postimg.cc/wj4SYMN6/dorcas.jpg"
              alt="Dorcas Naita"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

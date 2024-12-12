import React from "react";

const AboutUs = () => {
  return (
    <div className="px-6 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* About Us Section */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to SocioVerse, a platform designed to connect students and
          societies across universities. Our mission is to provide a digital
          space where university students can discover events, stay updated with
          news, and engage with their respective university societies. We aim to
          foster community, collaboration, and communication across various
          university networks.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          At SocioVerse, we believe that creating strong connections within
          university communities is key to enriching the student experience.
          Whether you are looking for academic events, social gatherings, or
          professional development opportunities, we have it all.
        </p>

        {/* Footer Links */}
        <div className="mt-12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Quick Links
          </h2>
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="#" className="text-[#005F73] hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-[#005F73] hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="contactus" className="text-[#005F73] hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-[#005F73] hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

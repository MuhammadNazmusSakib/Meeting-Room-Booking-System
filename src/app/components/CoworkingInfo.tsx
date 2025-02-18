
import { FaRegBuilding, FaUsers, FaWifi, FaMobileAlt, FaDoorOpen, FaConciergeBell } from "react-icons/fa";

const CoworkingInfo = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="py-4 text-3xl md:text-4xl font-bold text-gray-900">
          We’ll Take Care of Your <span className="text-red-500">Coworking Needs.</span>
        </h2>
        <p className="mt-4 text-gray-600">
          When you hot desk for the day or rent a permanent desk in a coworking space, everything comes fully serviced. 
          Our expert support team is on hand to make sure every detail has been taken care of, so you can focus on doing your best work.
        </p>
      </div>

      {/* Grid Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Items */}
        <div className="flex items-start space-x-4">
          <FaUsers className="text-2xl text-red-500" />
          <p className="text-gray-700">Network in our dynamic coworking space or focus on work in a shared office.</p>
        </div>

        <div className="flex items-start space-x-4">
          <FaConciergeBell className="text-2xl text-red-500" />
          <p className="text-gray-700">Our reception team is here to help you and greet guests throughout the day.</p>
        </div>

        <div className="flex items-start space-x-4">
          <FaDoorOpen className="text-2xl text-red-500" />
          <p className="text-gray-700">Coworking customers can book meeting rooms if they need a private space.</p>
        </div>

        <div className="flex items-start space-x-4">
          <FaWifi className="text-2xl text-red-500" />
          <p className="text-gray-700">Business-grade WiFi, shared printers, and full IT support are included.</p>
        </div>

        <div className="flex items-start space-x-4">
          <FaRegBuilding className="text-2xl text-red-500" />
          <p className="text-gray-700">Enjoy access to our global business lounge network at 4,000+ locations.</p>
        </div>

        <div className="flex items-start space-x-4">
          <FaMobileAlt className="text-2xl text-red-500" />
          <p className="text-gray-700">Book and manage your coworking bookings via our app.</p>
        </div>

      </div>
    </section>
  );
};

export default CoworkingInfo;

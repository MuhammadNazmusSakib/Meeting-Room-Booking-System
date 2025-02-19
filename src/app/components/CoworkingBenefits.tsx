
import { FaUsers, FaBuilding, FaGlobe, FaHandshake } from "react-icons/fa";

const CoworkingBenefits = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="py-4 text-3xl md:text-4xl font-bold text-gray-900">
          Coworking Benefits <br /> Businesses of Every <span className="text-red-500">Size.</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Coworking spaces have a universal appeal for any kind of business. Whether you are a 
          one-person startup or a global company with offices that span five continents. Our flexible 
          coworking spaces are backed up with expert, on-site support from receptionists, through to 
          IT, cleaning, and security staff.
        </p>
      </div>

      {/* Grid Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Items */}
        <div className="flex items-start space-x-4">
          <FaUsers className="text-2xl text-red-500" />
          <p className="text-gray-700">
            <strong>Starting up?</strong> Cost-effective coworking spaces offer great networking opportunities.
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <FaBuilding className="text-2xl text-red-500" />
          <p className="text-gray-700">
            Larger-sized companies can opt for dedicated desks for any number of staff and locations.
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <FaHandshake className="text-2xl text-red-500" />
          <p className="text-gray-700">
            More established businesses will benefit from our business lounge access on the go.
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <FaGlobe className="text-2xl text-red-500" />
          <p className="text-gray-700">
            Our <strong>4,000+ locations</strong> globally will suit companies with a multinational reach.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CoworkingBenefits;

import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center">
      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Effortlessly Book Your Meeting Rooms
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Simplify your scheduling with our intuitive meeting room booking system.
        </p>

        {/* CTA Button */}
        <Link href="/dashboard">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;

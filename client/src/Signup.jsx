import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen py-40">
      <div className="container mx-auto">
        <div className="flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-1/2 bg-blue-500 flex flex-col item-center justify-center p-12">
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                We're glad you're here. Let's get you set up.
              </p>
            </div>
          </div>
          <div className="w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Join us</h2>
            <p className="mb-4">
                Create your Account and get started. 
            </p>
            <form action="">
                <div className="grid grid-cols-2 gap-5">
                    <input type="text" placeholder="First Name" className="border border-gray-400 py-1 px-2" />
                    <input type="text" placeholder="Last Name" className="border border-gray-400 py-1 px-2" />
                </div>
                <div className="mt-5">
                    <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                    <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                    <input type="password" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="flex gap-2 mt-5">
                    <input type="checkbox" className="border border-gray-400"/>
                    <span>
                        I accept the <a href="#" className="text-blue-500 font-semibold">Terms of Use</a> & <a href="#" className="text-blue-500 font-semibold">Privacy Policy</a>
                    </span>
                </div>
                <div className="mt-5">
                    <button className="w-full bg-blue-500 py-3 text-center text-white">Register</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';

interface Merchant {
  email: string;
  name?: string;
  password: string;
  phoneNumber?: string;
  businessType?: string;
  businessAddress?: string;
  profilePicture?: string;
}

const MerchantForm: React.FC = () => {
  const [merchant, setMerchant] = useState<Merchant>({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
    businessType: '',
    businessAddress: '',
    profilePicture: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(merchant);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* SVG Profile */}
        <div className="flex justify-center">
          <svg
            className="w-24 h-24 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.75 8.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm6.25 9c0 .414-.336.75-.75.75H8.75a.75.75 0 01-.75-.75v-.625c0-1.864 1.866-3.375 4.25-3.375s4.25 1.511 4.25 3.375V17.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-blue-900 text-center">Merchant Profile</h1>

        {merchant.profilePicture && (
          <div className="flex justify-center">
            <img
              src={merchant.profilePicture}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'email', label: 'Email', type: 'email', required: true },
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'password', label: 'Password', type: 'password', required: true },
            { id: 'phoneNumber', label: 'Phone Number', type: 'text' },
            { id: 'businessType', label: 'Business Type', type: 'text' },
            { id: 'businessAddress', label: 'Business Address', type: 'text' },
            { id: 'profilePicture', label: 'Profile Picture URL', type: 'text' },
          ].map(({ id, label, type, required }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={id}
                id={id}
                value={merchant[id as keyof Merchant] || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 hover:shadow-md hover:border-blue-400"
                required={required}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MerchantForm;

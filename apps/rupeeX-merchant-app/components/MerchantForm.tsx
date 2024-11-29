import React, { useEffect, useState } from 'react';
import { updateMerchantUser } from '../lib/actions/updateMerchantUser';
import { getMerchantDetails } from '../lib/actions/getMerchantDetails';

interface Merchant {
  email: string;
  name: string | null;
  password: string;
  phoneNumber: string | null;
  businessType: string | null;
  businessAddress: string | null;
  profilePicture: string | null;
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

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantData = await getMerchantDetails();
        if(merchantData){
          setMerchant(merchantData);
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error);
      }
    };

    fetchMerchantData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(merchant);
    // await updateMerchantUser(merchant);
    try {
      console.log(merchant);
      await updateMerchantUser(merchant); // Assuming this is an async function that updates the merchant
      alert("Merchant profile updated successfully!");
    } catch (error) {
      alert("An error occurred while updating the profile. Please try again.");
      console.error("Error updating merchant user:", error);
    }
  };  

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* SVG Profile */}
        <div className="flex justify-center">
          {merchant.profilePicture ? (
            <img
              src={merchant.profilePicture}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
          ) : (
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
          )}
        </div>
        <h1 className="text-3xl font-bold text-blue-900 text-center">Merchant Profile</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            {[
              { id: 'email', label: 'Email', type: 'email', required: true, colspan: 1, disabled: false },
              { id: 'name', label: 'Name', type: 'text', colspan: 1, disabled: false },
              { id: 'password', label: 'Password', type: 'password', required: true, colspan: 1, disabled: true },
              { id: 'phoneNumber', label: 'Phone Number', type: 'text', colspan: 1, disabled: false },
              { id: 'businessType', label: 'Business Type', type: 'text', colspan: 1, disabled: false },
              { id: 'profilePicture', label: 'Profile Picture URL', type: 'text', colspan: 1, disabled: false },
              { id: 'businessAddress', label: 'Business Address', type: 'textarea', required: false, colspan: 2, disabled: false },
            ].map(({ id, label, type, required, colspan, disabled }) => (
              <div
                key={id}
                className={`w-full px-3 mb-6 md:mb-0 p-2 ${colspan === 2 ? 'md:w-full' : 'md:w-1/2'}`}
              >
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={id}
                >
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    name={id}
                    id={id}
                    value={merchant[id as keyof typeof merchant] ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    rows={4}
                    required={required}
                    disabled={disabled}
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    name={id}
                    id={id}
                    value={merchant[id as keyof typeof merchant] ?? ''}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    required={required}
                    disabled={disabled}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MerchantForm;

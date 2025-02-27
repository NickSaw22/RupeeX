'use client';

import { useReducer, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { getSession } from 'next-auth/react';
import createUserScheduledTransfer from "../../lib/actions/createUserScheduledTransfer";

const scheduledTransferSchema = z.object({
    recipientType: z.enum(['User', 'Merchant']),
    toUserId: z.string().optional(),
    toMerchantId: z.string().optional(),
    amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']),
    isActive: z.boolean(),
});

type ScheduledTransferFormData = z.infer<typeof scheduledTransferSchema>;

const initialState: ScheduledTransferFormData = {
    recipientType: 'Merchant',
    toUserId: '',
    toMerchantId: '',
    amount: 0,
    frequency: 'Daily',
    isActive: true,
};

function formReducer(
    state: ScheduledTransferFormData,
    action: { field: keyof ScheduledTransferFormData; value: any }
): ScheduledTransferFormData {
    return { ...state, [action.field]: action.value };
}

const ScheduledTransferForm: React.FC = () => {
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const session = await getSession();
            const validData = scheduledTransferSchema.parse(formData);
            // const response = await fetch('/api/createScheduledTransfer', {
            //     method: 'POST',
            //     headers: { 
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`, // Attach the token here
            //     },
            //     body: JSON.stringify(validData),
            // });
            console.log(validData);
            const response = await createUserScheduledTransfer(validData);
            if (response && response.status == "Success") {
                alert('Transfer scheduled sucessfully');
                //router.push('/merch-transfers');
            }
            else {
                const error = response;
                alert(`Error: ${error.message || 'Something went wrong'}`);
            }
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                alert('Validation Error: ' + error.errors.map((e) => e.message).join(', '));
            } else {
                alert('Unexpected Error!');
            }
        } finally {
            setIsLoading(false); 
        }

    }
    
    
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Recipient Type</label>
          <select
            value="Merchant"
            onChange={(e) => dispatch({ field: 'recipientType', value: e.target.value })}
            disabled={true}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          >
            <option value="User">User</option>
            <option value="Merchant">Merchant</option>
          </select>
        </div>

        {formData.recipientType === 'User' ? (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Recipient User ID</label>
            <input
              type="text"
              value={formData.toUserId}
              onChange={(e) => dispatch({ field: 'toUserId', value: e.target.value })}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            />
          </div>
        ) : (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Recipient Merchant ID</label>
            <input
              type="text"
              value={formData.toMerchantId}
              onChange={(e) => dispatch({ field: 'toMerchantId', value: e.target.value })}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            />
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => dispatch({ field: 'amount', value: Number(e.target.value) })}
            min={1}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Frequency</label>
          <select
            value={formData.frequency}
            onChange={(e) => dispatch({ field: 'frequency', value: e.target.value })}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => dispatch({ field: 'isActive', value: e.target.checked })}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
        </div>

        <button
          type="submit"
          disabled={false}
          className="w-full py-2 px-4 font-semibold rounded-md shadow focus:outline-none bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Schedule Transfer
        </button>
      </form>
    </div>
  );
};
export default ScheduledTransferForm;

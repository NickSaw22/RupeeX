"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { SelectInput } from "@repo/ui/selectinput";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money" className="p-6 bg-white rounded-lg shadow-lg">
      <div className="w-full space-y-4">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => setAmount(Number(value))}
          className="w-full"
        />
        <div className="text-left text-gray-700 font-medium">Bank</div>
        <SelectInput
          onSelect={(value) => {
            const selectedBank = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(selectedBank?.redirectUrl || "");
            setProvider(selectedBank?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        //   className="w-full"
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount * 100, provider);
              window.location.href = redirectUrl || "";
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};

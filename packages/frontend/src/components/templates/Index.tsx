import React from 'react';
import { TokenizedForm } from '@/components/molecules/TokenizeForm';
import { Wallet } from '@/components/organisms/Wallet';

export const Index: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white w-1/2 h-1/3 rounded-3xl p-4 flex flex-col justify-between">
                <div className="h-1/2">
                    <h1 className="text-center font-bold text-3xl mt-8">
                        tokenized url
                    </h1>
                    <h2 className="text-center text-gray-400 m-4">
                        Emotional feelings forever.
                    </h2>
                </div>

                <div className="text-center h-1/2">
                    <Wallet />
                    <TokenizedForm />
                </div>
            </div>
        </div>
    );
};

import ApplicationLogo from '@/Components/ApplicationLogo';
import budget_logo from '@/Components/budget_logo.png';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-blue-700 dark:bg-gray-900">
            <div className='flex items-center sm:justify-center'>
            <img src={ budget_logo } className="w-20 h-20" alt=''/>
                <span className="text-white ml-2 ">
                    Budget Tracker
                </span>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

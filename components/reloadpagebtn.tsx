'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const ReloadPageBtn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true); // Change button text to "Retrying..."
        router.refresh(); // Refresh the page
    };

    return (
        <div>
            <button 
                onClick={handleClick} 
                className="button bg-gray-700 text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
                disabled={loading} // Disable button while loading
            >
                {loading ? "Retrying..." : "Retry"}
            </button>
        </div>
    );
}

export default ReloadPageBtn;
"use client";
// import React, { useState } from 'react'
// import { subscribeToNewsletter } from '@/lib/actions'

// const SubscribeNewsletterForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

//   const handleSubmit = async (formData: FormData) => {
//     setIsSubmitting(true);
//     try {
//       const response = await subscribeToNewsletter(formData);
//       setResult(response);
//     } catch (error) {
//       setResult({ success: false, error: 'An unexpected error occurred' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className='flex flex-col gap-2'>
//         <header>
//             <h2 className='text-2xl text-orange-500 font-bold'>Subscribe to our newsletter</h2>
//             <p className='text-gray-500 text-sm'>Get the latest updates from KU Watch</p>
//         </header>
//         <form action={handleSubmit} className='flex flex-col gap-2'>
//             <div className="flex flex-col gap-1">
//                 <label htmlFor="email" className='text-sm font-semibold mb-1 self-start'>Email</label>
//                 <input type="email" name="email" placeholder="Email" className='px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-semibold' required/>
//             </div>

//             {/*
//                 Mailerlite Anti-spam policy which says

//                 An opt-in checkbox on a form. This checkbox must not be checked by default, the person completing the form must willingly select the checkbox to indicate they want to hear from you.
            
//             */}

//             <button 
//               type="submit" 
//               className='button px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-semibold disabled:opacity-50'
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Subscribing...' : 'Subscribe'}
//             </button>
            
//             {result && result.success && (
//               <div className="mt-2 p-2 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm font-semibold">
//                 {result.message || "Successfully subscribed to the newsletter!"}
//               </div>
//             )}
            
//             {result && !result.success && (
//               <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md">
//                 {result.error || "Failed to subscribe to the newsletter."}
//               </div>
//             )}
//         </form>
//     </div>
//   )
// }

// export default SubscribeNewsletterForm
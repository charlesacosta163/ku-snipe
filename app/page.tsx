import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import Link from 'next/link'


const LandingPage = () => {
  return (
    <main className="h-screen snap-none sm:snap-y sm:snap-mandatory overflow-y-scroll bg-[#FFF5F5]">
      <section id="Home" className="relative snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="fixed top-4 left-1/2 -translate-x-1/2">
          <nav className='text-sm text-gray-500 bg-white flex gap-4 px-4 py-2 shadow-md rounded-full font-semibold z-[100] items-center'>
              <a className='hidden sm:block' href="#Home">Home</a>
              <a href="#About">About</a>
              <a href="#Features">Features</a>
              <a href="#FAQs">FAQs</a>
              <a href="#Pricing">Pricing</a>
              <Link href="/signin" className='bg-[#2A3370] text-white px-2 py-1 text-xs rounded-lg font-semibold flex items-center gap-2'>
                Login
              </Link>
          </nav>
        </div>

        <div className="h-full flex flex-col items-center justify-center px-4 pt-20 md:pt-0">
          {/* Logo */}
          <div className="flex flex-col items-center bg-[#2A3370] text-white px-4 py-2 rounded-lg mb-4">
            <h1 id='Logo' className='logo font-serif italic px-4 py-2 text-xs rounded-lg font-semibold'>📘 KU-WATCH</h1>
            <span className='font-bold text-sm'>Kean University's Course Sniper</span>
          </div>
          <p className='bg-orange-500 text-white px-2 py-1 text-xs rounded-lg font-semibold self-center mb-4'>Beta</p>          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl text-balance text-[#2A3370] font-bold text-center mb-6 tracking-tight">
            Never miss a spot in your<br />favorite courses again
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-center text-lg mb-8 max-w-2xl">
            Get instant notifications when a seat opens up in any course. Set it up once and we'll do the rest.
          </p>

          {/* Search Input and Button */}
          <div className="mb-16">

            <Link href='/signin' className="bg-[#2A3370] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <span>🐆</span>
              Start Watching
            </Link>

          </div>

          {/* Stats */}
          {/* <div className="flex gap-16 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
          </div> */}
        </div>
      </section>
      <section id="About" className="snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="h-full flex flex-col md:flex-row items-center gap-16 px-4">
          {/* Left side - About content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl mt-16 md:mt-0 sm:text-4xl font-bold text-[#2A3370]">🐾 About KU Watch 🐾</h2>
            
            <p className="text-gray-600 text-lg">
              KU Watch was born out of frustration. As students ourselves, we know how stressful course registration can be, especially when the classes you need are full.
            </p>

            <p className="text-gray-600 text-lg">
              Our platform continuously monitors course availability and instantly notifies you when a spot opens up, giving you the best chance to secure your place.
            </p>

          </div>

          {/* Right side - Mission statement */}
          <div className="flex-1">
            <div className="bg-[#2A3370] text-white rounded-3xl p-12 text-center">
              <div className="text-4xl mb-6">📚</div>
              <h3 className="text-2xl font-bold mb-4 text-[#B8C1E5]">Our Mission</h3>
              <p className="text-gray-300 text-lg">
                To make course registration stress-free and efficient for every student.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="Features" className="snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="h-full flex flex-col items-center justify-center px-4 py-16 md:py-0">
          <h2 className="text-2xl mt-16 md:mt-0 sm:text-4xl font-bold mb-16 text-[#2A3370]">🐾 How It Works 🐾</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
            {/* Step 1 */}
            <div className="bg-[#B8C1E5] bg-opacity-10 rounded-3xl p-8 text-center">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2A3370]">1. Enter Course Details</h3>
              <p className="text-gray-600">
                Simply enter the course code you want to monitor. You can add multiple courses at once.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#B8C1E5] bg-opacity-10 rounded-3xl p-8 text-center ">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2A3370]">2. We Monitor 24/7</h3>
              <p className="text-gray-600">
                Our system checks course availability every 24/7, ensuring you never miss an opening.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#B8C1E5] bg-opacity-10 rounded-3xl p-8 text-center ">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2A3370]">3. Get Notified Instantly</h3>
              <p className="text-gray-600">
                Receive immediate notifications via Discord when a spot becomes available.
              </p>
            </div>
          </div>

          <Link href='/signin' className="bg-[#2A3370] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
            <span>⚡</span>
            Try It Now
          </Link>
        </div>
      </section>
      <section id="FAQs" className="snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="h-full flex flex-col items-center justify-center px-4 py-16 md:py-0">
          <h2 className="text-2xl mt-16 md:mt-0 sm:text-4xl font-bold mb-16 text-[#2A3370]">🐾 Frequently Asked Questions 🐾</h2>

          <Accordion type="single" collapsible className="w-full mb-16">
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-[#2A3370]'>How does KU Watch work?</AccordionTrigger>
              <AccordionContent>
                KU Watch monitors your selected courses 24/7. When a seat becomes available, you'll receive a Discord notification reminder of your desired course.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className='text-[#2A3370]'>How fast are the notifications?</AccordionTrigger>
              <AccordionContent>
                Notifications are sent within seconds of a seat becoming available, giving you the best chance to secure your spot.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className='text-[#2A3370]'>Can I monitor waitlisted courses?</AccordionTrigger>
              <AccordionContent>
                Yes, you can monitor both waitlisted courses and closed sections. We'll notify you as soon as a spot opens up.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className='text-[#2A3370]'>What notification methods are available?</AccordionTrigger>
              <AccordionContent>
                We currently only support Discord notifications.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          <a href='mailto:contact@kuwatch.org' className="text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-gray-50">
              <span>💬</span>
              Contact Support
            </button>
          </a>
        </div>
      </section>
      <section id="Pricing" className="snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="h-full flex flex-col items-center justify-center px-4 py-16 md:py-0">
          <h2 className="text-2xl mt-16 md:mt-0 sm:text-4xl font-bold mb-6 text-[#2A3370]">🐾 Simple, Transparent Pricing 🐾</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl">
            Choose the plan that fits your needs. All plans include Discord notifications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
            {/* Scout */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-[#2A3370]">Scout</h3>
                <div className="text-4xl font-bold mb-2 text-[#2A3370]">$0</div>
                <div className="text-gray-600">Forever free</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>2 courses monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Discord notifications</span>
                </li>
              </ul>
              <Link href='/signin' className="w-full bg-[#2A3370] text-white rounded-lg py-2 font-medium">
                <button className="w-full bg-[#2A3370] text-white rounded-lg py-2 font-medium">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Sharpshooter Plan */}
            <div className="bg-[#2A3370] text-white rounded-3xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Sharpshooter</h3>
                <div className="text-4xl font-bold mb-2">$5</div>
                <div className="text-gray-200">per semester</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>6 courses monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Discord notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>See how many people are watching the same course</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>And many more advanced features!</span>
                </li>
              </ul>
              <button className="w-full bg-white text-blue-700 rounded-lg py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"  disabled>
                Coming Soon
              </button>
            </div>
          
          </div>
        </div>
      </section>
      <section id="CTA" className="snap-start h-auto md:h-screen w-full max-w-[1000px] mx-auto">
        <div className="h-full flex flex-col items-center justify-center px-4 py-16 md:py-0 text-center">
          <div className="bg-[#B8C1E5] bg-opacity-15 rounded-3xl p-8 sm:p-12 md:p-16 w-full">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-[#2A3370]">
            🐾 Ready to Never Miss a Course Again? 🐾
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join fellow students who've already secured their desired courses. Start monitoring your first two courses for free.
            </p>
            <div className="flex flex-col gap-8 items-center">
              <Link href='/signin' className="bg-[#2A3370] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
                <span>🎯</span>
                Start Sniping Courses
              </Link>



            </div>
          </div>
        </div>
      </section>
      <footer className="snap-start w-full max-w-[1000px] mx-auto px-4 py-16 bg-transparent rounded-t-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <h1 id='Logo' className='logo font-serif italic bg-[#2A3370] text-white px-4 py-2 text-xs rounded-lg font-semibold flex items-center gap-2'>📘 KU-WATCH</h1>
            </div>
            <p className="text-sm text-gray-600">
              Making course registration stress-free for every student.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#Features" className="hover:text-gray-900">Features</a></li>
              <li><a href="#Pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="#FAQs" className="hover:text-gray-900">FAQs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#About" className="hover:text-gray-900">About</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 KU Watch. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default LandingPage
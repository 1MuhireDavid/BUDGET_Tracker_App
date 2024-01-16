import { Link, Head } from '@inertiajs/react';
import budget_logo from '@/Components/budget_logo.png';
import googleplay from '@/Components/googleplay.png';
import Appstore from '@/Components/Appstore.png';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
           
        
               <body>
               <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src={budget_logo} alt="Budget Logo" className="w-8 h-8" />
            <span className="text-white ml-2 font-semibold">Budget Tracker</span>
          </Link>

          <ul className="flex space-x-4">
            <li><a href="#home" className="text-white">Home</a></li>
            <li><a href="#about" className="text-white">About</a></li>
            <li><a href="#services" className="text-white">Services</a></li>
            <li><a href="#contact" className="text-white">Contact</a></li>
          </ul>
          <div class="">
                    {props.auth.user ? (
                        <Link
                            href={route('dashboard')}
                            class="font-semibold text-white-600 hover:text-white-900 dark:text-white-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-white-600 hover:text-white-900 dark:text-black-400 dark:hover:text-black focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Login
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-white-600 hover:text-white-900 dark:text-white-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

        </div>
      </nav>

    
          <div className="main-content bg-gray-100 p-8">
            <section id="home">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-gray-600">Explore the amazing content we have for you!</p>
           </section>

           <section id="about" className="mt-8">
           <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600">
            We're dedicated to providing you with a great experience and valuable information.
          </p>
          <p className="text-gray-600">
            Feel free to navigate through our pages and learn more about us.
          </p>

        </section>

        <section id="services" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Efficient Budgeting</li>
            <li>User Empowerment</li>
            <li>Real-time Insights</li>
          </ul>
        </section>

        <section id="contact" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Feel free to reach out to us at{' '}
            <a href="mailto:info@budgettracker.com" className="text-blue-500 hover:text-blue-700">
              info@budgettracker.com
            </a>
            .
          </p>
        </section>
        <div >
      <section id="bottom-left-section" className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Download Our App</h2>
          <p className="text-blue-600">
            Get our app on your device for an amazing experience!
          </p>
          <div className="flex space-x-2 mt-4">
            <a href="https://itunes.apple.com/" target="_blank" rel="noopener noreferrer">
              <img src={Appstore} alt="App Store" className="w-40 h-15" />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
              <img src={googleplay} alt="Play Store" className="w-40 h-15" />
            </a>
          </div>
      </section>
    </div>

</div>
   
    <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Our Website. All rights reserved.</p>
    </footer>

</body>

        </>
    );
}
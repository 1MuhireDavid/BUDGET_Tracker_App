import { Link, Head,  } from '@inertiajs/react';
import budget_logo from '@/Components/budget_logo.png';
import googleplay from '@/Components/googleplay.png';
import Appstore from '@/Components/Appstore.png';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
           
           
                <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {props.auth.user ? (
                        <Link
                            href={route('dashboard')}
                            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
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

               
               
               <body>
                 <nav>
                 <a className="navbar-brand img" href="/">
                 <img src={ budget_logo }  alt=''/>
                <span className="text-white ml-2 ">
                    Budget Tracker
                </span>
          {/* Use the appropriate syntax to get the app name from your configuration */}
          
        </a>
             <ul>
            <li><a  href={route('login')}>Home</a></li>
            <li><a  href={route('about')}>About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
           </ul>
          </nav>

    
          <div class="main-content">
            <section id="home">
            <h1>Welcome to Our Website</h1>
            <p>Explore the amazing content we have for you!</p>
           </section>

           <section id="about">
            <h2>About Us</h2>
            <p> We're dedicated to providing you with a great experience and valuable information.</p>
                <p>Feel free to navigate through our pages and learn more about us.</p> 

        </section>

        <section id="services">
            <h2>Our Services</h2>
            <ul>
                <li>Efficient Budgeting</li>
                <li>User Empowerment</li>
                <li>Real-time Insights</li>
            </ul>
        </section>

        <section id="contact">
            <h2>Contact Us</h2>
            <p>Feel free to reach out to us at <a href="mailto:info@budgettracker.com" class="text-blue-500 hover:text-blue-700">info@budgettracker.com</a>
.</p>
        </section>
        <div >
      <section id="bottom-left-section">
      <h2 className="text-2xl font-bold mb-0">Download Our App</h2>
        <p className="text-blue-600">Get our app on your device for an amazing experience!</p>
        <div className="flex space-x-2 mt-0">

        {/* App Store Link */}
        <a href="https://itunes.apple.com/" target="_blank" rel="noopener noreferrer">
          <img
            src={Appstore}  // Replace with the actual App Store icon image
            alt=' '
            className="w-40 h-15 mr-10"
          />
        </a>

        {/* Play Store Link */}
        <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
          <img
            src={googleplay} // Replace with the actual Play Store icon image
            alt=' '
            className="w-40 h-15 mr-10"
          />
        </a>
        </div>
      </section>
    </div>

</div>
   
    <footer>
        <p>&copy; 2023 Our Website. All rights reserved.</p>
    </footer>

</body>

        </>
    );
}

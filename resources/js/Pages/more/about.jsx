// Import necessary React modules
import React, { useEffect, useState } from 'react';

// AboutUs component
const AboutUs = () => {
  // State to store about us content
  const [aboutUsContent, setAboutUsContent] = useState('');

  // useEffect to fetch about us content from the backend
  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        // Assuming you have a Laravel API endpoint for about us content
        const response = await fetch('/api/about-us');
        const data = await response.json();
        setAboutUsContent(data.content);
      } catch (error) {
        console.error('Error fetching about us content:', error);
      }
    };

    fetchAboutUsContent();
  }, []);

  return (
    <div>
      <h1>About Us</h1>
      <p>{aboutUsContent}</p>
    </div>
  );
};

// Export the AboutUs component
export default AboutUs;

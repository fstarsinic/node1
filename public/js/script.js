document.addEventListener("DOMContentLoaded", function () {
    const teamsCarousel = document.querySelector('.teams-carousel');
    const images = [
      '/images/UIcomponents/fowl.png',
      '/images/UIcomponents/downpour.png',
      '/images/UIcomponents/Klassics.png',
      '/images/UIcomponents/lightshow.png',
      '/images/UIcomponents/mercs.png',
      '/images/UIcomponents/rooks.png',
      '/images/UIcomponents/sharks.png',
      '/images/UIcomponents/slashers.png'
    ];
    let currentImageIndex = 0;
  
    function changeImage() {
      const img = document.createElement('img');
      img.src = images[currentImageIndex];
      img.alt = 'Team Image';
      teamsCarousel.innerHTML = ''; // Clear previous images
      teamsCarousel.appendChild(img);
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }
  
    changeImage();
    setInterval(changeImage, 2000);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Set the date of December 23rd, 2023
    const countdownDate = new Date('2023-12-23T00:00:00').getTime();
  
    // Function to update the countdown timer
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      // Calculate remaining time
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Display the countdown timer
      const countdownTimer = document.getElementById('countdown-timer');
      countdownTimer.innerHTML = `Winter Classic<br>${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    // Initial call to start the countdown
    updateCountdown();
  
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
  });
  
  
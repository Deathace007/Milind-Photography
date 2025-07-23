// Menu toggle functionality with error handling
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
}

// ScrollReveal animations with safety checks
if (typeof ScrollReveal === 'function') {
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  // About section animations
  const aboutContainer = document.querySelector(".about__container");
  if (aboutContainer) {
    ScrollReveal().reveal(".about__container .section__header", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".about__container .section__description", {
      ...scrollRevealOption,
      delay: 500,
      interval: 500,
    });
    ScrollReveal().reveal(".about__container img", {
      ...scrollRevealOption,
      delay: 1500,
    });
  }

  // Service section animations
  const serviceContainer = document.querySelector(".service__container");
  if (serviceContainer) {
    ScrollReveal().reveal(".service__container .section__header", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".service__container .section__description", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".service__card", {
      duration: 1000,
      delay: 1000,
      interval: 500,
    });
  }

  // Blog section animations
  const blogContent = document.querySelector(".blog__content");
  if (blogContent) {
    ScrollReveal().reveal(".blog__content .section__header", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".blog__content h4", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".blog__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".blog__content .blog__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });
  }
} else {
  console.warn("ScrollReveal is not loaded. Animation effects will not work.");
}

// Swiper initialization with safety check
if (typeof Swiper === 'function') {
  const swiperElement = document.querySelector(".swiper");
  if (swiperElement) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }
} else {
  console.warn("Swiper is not loaded. Slider functionality will not work.");
}

// Instagram feed duplication with safety to prevent multiple runs
const instagram = document.querySelector(".instagram__flex");
if (instagram && !instagram.getAttribute("data-duplicated")) {
  const originalChildren = Array.from(instagram.children);
  if (originalChildren.length > 0) {
    originalChildren.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      instagram.appendChild(duplicateNode);
    });
    instagram.setAttribute("data-duplicated", "true");
  }
}

// Enhanced Video Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
  // Video data with metadata
  const videoData = [
    {
      src: 'video1.mp4',
      title: 'Wedding Cinematography',
      description: 'Beautiful wedding moments captured with cinematic excellence and emotional depth.'
    },
    {
      src: 'video2.mp4',
      title: 'Corporate Event Coverage',
      description: 'Professional corporate event documentation with attention to detail.'
    },
    {
      src: 'video3.mp4',
      title: 'Fashion Photography',
      description: 'High-end fashion shoots showcasing style and elegance.'
    },
    {
      src: 'video4.mp4',
      title: 'Portrait Sessions',
      description: 'Intimate portrait photography capturing personality and character.'
    },
    {
      src: 'video5.mp4',
      title: 'Commercial Production',
      description: 'Creative commercial video production for brands and businesses.'
    }
  ];

  // DOM elements
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');
  const prevBtn = document.getElementById('prev-video');
  const nextBtn = document.getElementById('next-video');
  const videoCounter = document.getElementById('video-counter');
  const videoTitle = document.getElementById('video-title');
  const videoDescription = document.getElementById('video-description');
  const videoOverlay = document.getElementById('video-overlay');
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoLoading = document.getElementById('video-loading');
  const videoProgress = document.getElementById('video-progress');
  const thumbnailsContainer = document.getElementById('video-thumbnails');

  let currentVideo = 0;
  let isTransitioning = false;

  // Initialize video slideshow
  function initVideoSlideshow() {
    if (!videoPlayer || !videoSource) return;

    // Set up thumbnails click handlers
    setupThumbnails();

    // Load first video
    loadVideo(0);

    // Set up video event listeners
    setupVideoEvents();

    // Set up control buttons
    setupControlButtons();
  }

  function setupThumbnails() {
    if (!thumbnailsContainer) return;

    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        if (index !== currentVideo && !isTransitioning) {
          loadVideo(index);
        }
      });
    });
  }

  function setupVideoEvents() {
    if (!videoPlayer) return;

    // Show overlay when video ends
    videoPlayer.addEventListener('ended', () => {
      showOverlay();
    });

    // Hide loading when video can play
    videoPlayer.addEventListener('canplay', () => {
      hideLoading();
    });

    // Show loading when video starts loading
    videoPlayer.addEventListener('loadstart', () => {
      showLoading();
    });

    // Handle video errors
    videoPlayer.addEventListener('error', (e) => {
      console.error('Video loading error:', e);
      hideLoading();
    });

    // Update progress during playback
    videoPlayer.addEventListener('timeupdate', updateProgress);
  }

  function setupControlButtons() {
    // Play button functionality
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener('click', playVideo);
    }

    if (videoOverlay) {
      videoOverlay.addEventListener('click', playVideo);
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
          const prevIndex = (currentVideo - 1 + videoData.length) % videoData.length;
          loadVideo(prevIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
          const nextIndex = (currentVideo + 1) % videoData.length;
          loadVideo(nextIndex);
        }
      });
    }
  }

  function loadVideo(index) {
    if (isTransitioning || !videoPlayer || !videoSource) return;

    isTransitioning = true;
    const video = videoData[index];

    // Show loading state
    showLoading();

    // Update current video index
    currentVideo = index;

    // Pause current video
    videoPlayer.pause();

    // Update video source
    videoSource.src = video.src;
    videoPlayer.load();

    // Update UI elements
    updateVideoInfo(video);
    updateCounter();
    updateThumbnails();
    updateProgress();
    updateNavigationButtons();

    // Show overlay for new video
    showOverlay();

    // Reset transition flag after a delay
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function updateVideoInfo(video) {
    if (videoTitle) {
      videoTitle.textContent = video.title;
    }
    if (videoDescription) {
      videoDescription.textContent = video.description;
    }
  }

  function updateCounter() {
    if (videoCounter) {
      videoCounter.textContent = `${currentVideo + 1} / ${videoData.length}`;
    }
  }

  function updateThumbnails() {
    if (!thumbnailsContainer) return;

    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      if (index === currentVideo) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  function updateProgress() {
    if (!videoProgress) return;

    const progress = ((currentVideo + 1) / videoData.length) * 100;
    videoProgress.style.width = `${progress}%`;
  }

  function updateNavigationButtons() {
    if (prevBtn) {
      prevBtn.disabled = false; // Always enabled for circular navigation
    }
    if (nextBtn) {
      nextBtn.disabled = false; // Always enabled for circular navigation
    }
  }

  function playVideo() {
    if (!videoPlayer) return;

    hideOverlay();
    videoPlayer.play().catch(e => {
      console.error('Error playing video:', e);
      showOverlay();
    });
  }

  function showOverlay() {
    if (videoOverlay) {
      videoOverlay.classList.remove('hidden');
    }
  }

  function hideOverlay() {
    if (videoOverlay) {
      videoOverlay.classList.add('hidden');
    }
  }

  function showLoading() {
    if (videoLoading) {
      videoLoading.classList.add('show');
    }
  }

  function hideLoading() {
    if (videoLoading) {
      videoLoading.classList.remove('show');
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
      return; // Don't interfere with form inputs
    }

    switch(e.key) {
      case 'ArrowLeft':
        if (prevBtn && !isTransitioning) {
          prevBtn.click();
        }
        break;
      case 'ArrowRight':
        if (nextBtn && !isTransitioning) {
          nextBtn.click();
        }
        break;
      case ' ':
      case 'Enter':
        if (videoPlayer) {
          e.preventDefault();
          if (videoPlayer.paused) {
            playVideo();
          } else {
            videoPlayer.pause();
            showOverlay();
          }
        }
        break;
    }
  });

  // Initialize the video slideshow
  initVideoSlideshow();

  console.log('Enhanced video slideshow initialized successfully');
});

// Add event listener for document ready to ensure DOM is fully loaded
// Video slideshow logic for #video-slideshow
document.addEventListener('DOMContentLoaded', function() {
  // Video slideshow setup
  const videoFiles = [
    'video1.mp4',
    'video2.mp4',
    'video3.mp4',
    'video4.mp4',
    'video5.mp4'
  ];
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');
  const prevBtn = document.getElementById('prev-video');
  const nextBtn = document.getElementById('next-video');
  const videoCounter = document.getElementById('video-counter');
  let currentVideo = 0;

  function loadVideo(index) {
    if (!videoPlayer || !videoSource) return;
    // Pause current video
    videoPlayer.pause();
    // Update source
    videoSource.src = videoFiles[index];
    videoPlayer.load();
    videoCounter.textContent = `${index + 1}/${videoFiles.length}`;
    // Autoplay after loading
    videoPlayer.play();
  }

  if (videoPlayer && videoSource && prevBtn && nextBtn && videoCounter) {
    prevBtn.addEventListener('click', function() {
      currentVideo = (currentVideo - 1 + videoFiles.length) % videoFiles.length;
      loadVideo(currentVideo);
    });
    nextBtn.addEventListener('click', function() {
      currentVideo = (currentVideo + 1) % videoFiles.length;
      loadVideo(currentVideo);
    });
    // Initial load
    loadVideo(currentVideo);
  }

  console.log('Document fully loaded and script executed');
});

// Menu toggle functionality with error handling
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute(
      "class",
      isOpen ? "ri-close-line" : "ri-menu-line"
    );
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
}

// ScrollReveal animations with safety checks
if (typeof ScrollReveal === "function") {
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
if (typeof Swiper === "function") {
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
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎬 Enhanced Video Slideshow starting...");

  // Video data with metadata
  const videoData = [
    {
      src: "video1.mp4",
      title: "MSD's Winzo Shoot",
      description:
        "An exclusive behind-the-scenes look at cricket superstar MS Dhoni on the energetic set of the Winzo commercial.",
    },
    {
      src: "video2.mp4",
      title: "Bipasha & Karan for the OPPO Valentine's Ad",
      description:
        "    Capturing the on-set chemistry and fun between Bipasha Basu and Karan Singh Grover for the OPPO Valentine's Day commercial.",
    },
    {
      src: "video3.mp4",
      title: "Kajal Aggarwal for the Prega News Commercial",
      description: "A vibrant behind-the-scenes glimpse of actress Kajal Aggarwal during the multi-set shoot for the Prega News campaign.",
    },
    {
      src: "video4.mp4",
      title: "Sonakshi Sinha for the Nature Fresh Ad",
      description:
        "A lighthearted look behind the camera at the fun and professional process of filming the Nature Fresh ad with actress Sonakshi Sinha.",
    },
    {
      src: "video5.mp4",
      title: "The Making of the Pristyn Care Commercial",
      description:
        "Go behind the camera to see the meticulous direction and on-set action of the Pristyn Care commercial shoot.",
    },
  ];

  // DOM elements
  const videoPlayer = document.getElementById("video-player");
  const videoSource = document.getElementById("video-source");
  const prevBtn = document.getElementById("prev-video");
  const nextBtn = document.getElementById("next-video");
  const videoCounter = document.getElementById("video-counter");
  const videoTitle = document.getElementById("video-title");
  const videoDescription = document.getElementById("video-description");
  const videoOverlay = document.getElementById("video-overlay");
  const videoPlayBtn = document.getElementById("video-play-btn");
  const videoLoading = document.getElementById("video-loading");
  const videoProgress = document.getElementById("video-progress");
  const thumbnailsContainer = document.getElementById("video-thumbnails");

  let currentVideo = 0;
  let isTransitioning = false;

  // Initialize video slideshow
  function initVideoSlideshow() {
    if (!videoPlayer || !videoSource) {
      console.error("❌ Video player or source not found!");
      return;
    }

    console.log("🎬 Initializing video slideshow...");
    console.log("🎬 Video player found:", !!videoPlayer);
    console.log("🎬 Video source found:", !!videoSource);
    console.log("🎬 Video overlay found:", !!videoOverlay);
    console.log("🎬 Video play button found:", !!videoPlayBtn);

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

    const thumbnails = thumbnailsContainer.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        if (index !== currentVideo && !isTransitioning) {
          loadVideo(index);
        }
      });
    });
  }

  function setupVideoEvents() {
    if (!videoPlayer) return;

    // Show overlay when video ends
    videoPlayer.addEventListener("ended", () => {
      console.log("🎬 Video ended, showing overlay");
      showOverlay();
    });

    // Hide loading when video can play
    videoPlayer.addEventListener("canplay", () => {
      console.log("🎬 Video can play, hiding loading");
      hideLoading();
    });

    // Show loading when video starts loading
    videoPlayer.addEventListener("loadstart", () => {
      console.log("🎬 Video loading started");
      showLoading();
    });

    // Handle video errors
    videoPlayer.addEventListener("error", (e) => {
      console.error("Video loading error:", e);
      hideLoading();
    });

    // Update progress during playback
    videoPlayer.addEventListener("timeupdate", updateProgress);

    // Add play and pause event listeners for debugging
    videoPlayer.addEventListener("play", () => {
      console.log("🎬 Video PLAY event fired");
    });

    videoPlayer.addEventListener("pause", () => {
      console.log("🎬 Video PAUSE event fired");
    });

    // Add click handler to video element for play/pause toggle
    videoPlayer.addEventListener("click", (e) => {
      console.log("🎬 Video element clicked");
      e.preventDefault(); // Prevent browser's default video controls
      if (videoPlayer.paused || videoPlayer.ended) {
        console.log("🎬 Video is paused/ended - playing...");
        playVideo();
      } else {
        console.log("🎬 Video is playing - pausing...");
        videoPlayer.pause();
        showOverlay();
      }
    });
  }

  // FIXED setupControlButtons function
  function setupControlButtons() {
    // Function to handle play/pause toggle
    function togglePlayPause() {
      if (!videoPlayer) return;

      console.log("🎬 Toggle play/pause called");
      console.log("🎬 Current paused state:", videoPlayer.paused);
      console.log("🎬 Current ended state:", videoPlayer.ended);

      if (videoPlayer.paused || videoPlayer.ended) {
        console.log("🎬 Video is paused/ended - playing...");
        playVideo();
      } else {
        console.log("🎬 Video is playing - pausing...");
        videoPlayer.pause();
        showOverlay();
      }
    }

    // Play button functionality - FIXED
    if (videoPlayBtn) {
      console.log("🎬 Adding click listener to video play button");
      videoPlayBtn.addEventListener("click", function (e) {
        console.log("🎬 Video play button clicked!");
        e.preventDefault();
        e.stopPropagation();
        if (videoPlayer.paused || videoPlayer.ended) {
          console.log("🎬 Keyboard: Playing video...");
          playVideo();
        } else {
          console.log("🎬 Keyboard: Pausing video...");
          videoPlayer.pause();
          showOverlay();
        }
      });
    } else {
      console.warn("⚠️ Video play button not found!");
    }

    // Video overlay functionality - FIXED
    if (videoOverlay) {
      console.log("🎬 Adding click listener to video overlay");
      videoOverlay.addEventListener("click", function (e) {
        console.log("🎬 Video overlay clicked!");
        e.preventDefault();
        e.stopPropagation();
        if (videoPlayer.paused || videoPlayer.ended) {
          console.log("🎬 Keyboard: Playing video...");
          playVideo();
        } else {
          console.log("🎬 Keyboard: Pausing video...");
          videoPlayer.pause();
          showOverlay();
        }
      });
    } else {
      console.warn("⚠️ Video overlay not found!");
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (!isTransitioning) {
          const prevIndex =
            (currentVideo - 1 + videoData.length) % videoData.length;
          loadVideo(prevIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
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

    console.log("🎬 Loading video:", video.title);

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

    const thumbnails = thumbnailsContainer.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
      if (index === currentVideo) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
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

    console.log("🎬 PlayVideo function called - attempting to play video");
    console.log("🎬 Current video source:", videoPlayer.currentSrc);
    console.log("🎬 Video ready state:", videoPlayer.readyState);
    console.log("🎬 Video paused state:", videoPlayer.paused);

    hideOverlay();
    videoPlayer.play().catch((e) => {
      console.error("❌ Error playing video:", e);
      console.error("❌ Error details:", e.name, e.message);
      showOverlay();
    });
  }

  function showOverlay() {
    if (videoOverlay) {
      console.log("🎬 Showing overlay");
      videoOverlay.classList.remove("hidden");
    }
  }

  function hideOverlay() {
    if (videoOverlay) {
      console.log("🎬 Hiding overlay");
      videoOverlay.classList.add("hidden");
    }
  }

  function showLoading() {
    if (videoLoading) {
      videoLoading.classList.add("show");
    }
  }

  function hideLoading() {
    if (videoLoading) {
      videoLoading.classList.remove("show");
    }
  }

  // FIXED Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (
      e.target.tagName.toLowerCase() === "input" ||
      e.target.tagName.toLowerCase() === "textarea"
    ) {
      return; // Don't interfere with form inputs
    }

    switch (e.key) {
      case "ArrowLeft":
        if (prevBtn && !isTransitioning) {
          prevBtn.click();
        }
        break;
      case "ArrowRight":
        if (nextBtn && !isTransitioning) {
          nextBtn.click();
        }
        break;
      case " ":
      case "Enter":
        if (videoPlayer) {
          e.preventDefault();
          console.log("🎬 Keyboard shortcut pressed:", e.key);
          console.log(
            "🎬 Video paused state before toggle:",
            videoPlayer.paused
          );

          // FIXED keyboard toggle logic
          if (videoPlayer.paused || videoPlayer.ended) {
            console.log("🎬 Keyboard: Playing video...");
            playVideo();
          } else {
            console.log("🎬 Keyboard: Pausing video...");
            videoPlayer.pause();
            showOverlay();
          }
        }
        break;
    }
  });

  // Initialize the video slideshow
  initVideoSlideshow();

  console.log("🎬 Enhanced video slideshow initialized successfully");
});

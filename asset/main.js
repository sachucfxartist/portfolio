// Data for portfolio items (Placeholder)
const portfolioItems = [
  {
    id: 1,
    title: "Neon Genesis",
    category: "3D Animation",
    image: "./asset/image/hero_img.jpg",
    video: "./asset/image/test.mp4", // Placeholder video
    description: "A futuristic exploration of light and shadow in a cyberpunk city."
  },
  {
    id: 2,
    title: "Fluid Dynamics",
    category: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1633596683562-4a47eb4983c5?q=80&w=1000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Experimental liquid simulations rendered in Blender."
  },
  {
    id: 3,
    title: "Character Walk Cycle",
    category: "2D Animation",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=1000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Frame-by-frame study of emotive character movement."
  },
  {
    id: 4,
    title: "Abstract Void",
    category: "VFX",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Visual effects composition for a sci-fi short film."
  }
];

// Cursor Follower Logic
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Render Portfolio Grid
const gridContainer = document.getElementById('portfolio-grid');

function renderGrid() {
  gridContainer.innerHTML = portfolioItems.map(item => `
    <div class="grid-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div class="grid-overlay">
        <h3 class="work-title">${item.title}</h3>
        <span class="work-category">${item.category}</span>
      </div>
    </div>
  `).join('');

  // Attach event listeners to new items
  document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item.dataset.id));
  });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const videoWrapper = document.getElementById('video-wrapper');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');

function openLightbox(id) {
  const item = portfolioItems.find(i => i.id == id);
  if (!item) return;

  // Inject video
  videoWrapper.innerHTML = `
    <video controls autoplay name="media" controlsList="nodownload" disablePictureInPicture oncontextmenu="return false;">
      <source src="${item.video}" type="video/mp4">
    </video>
  `;

  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Disable scroll
}

function closeLightbox() {
  lightbox.classList.remove('active');
  videoWrapper.innerHTML = ''; // Stop video
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Initialize
renderGrid();

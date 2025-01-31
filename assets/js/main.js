import { initThemeToggle } from './modules/themeToggle.js';
import { initParticles } from './modules/particles.js';

window.addEventListener("load", () => {
    console.log("Halaman selesai dimuat!");
    document.body.classList.remove("loading");
    document.getElementById("loader").style.display = "none";
  });
  
  // Fallback setelah 5 detik
  setTimeout(() => {
    document.body.classList.remove("loading");
    document.getElementById("loader").style.display = "none";
  }, 5000);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules
    initThemeToggle();
    initParticles();

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Form handling
    document.querySelector('.cyber-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Message transmitted successfully! 📡');
    });
});

// Fetch GitHub Activity
async function fetchGitHubActivity() {
    try {
      const response = await fetch('https://api.github.com/users/IrzanAkbar/events');
      const activity = await response.json();
      const activityGrid = document.getElementById('github-activity');
  
      activity.slice(0, 4).forEach(event => {
        activityGrid.innerHTML += `
          <div class="repo-card">
            <h3>${event.repo.name}</h3>
            <p>${event.type.replace('Event', '')}</p>
            <small>${new Date(event.created_at).toLocaleDateString()}</small>
          </div>
        `;
      });
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  }
  
  // Fetch GitHub Repos
  async function fetchGitHubRepos() {
    try {
      const response = await fetch('https://api.github.com/users/IrzanAkbar/repos');
      const repos = await response.json();m
      const repoGrid = document.getElementById('github-repos');
  
      repos.slice(0, 4).forEach(repo => {
        repoGrid.innerHTML += `
          <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>
            <a href="${repo.html_url}" class="demo-btn">View Code</a>
          </div>
        `;
      });
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  }
  
  // Jalankan fungsi saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubActivity();
    fetchGitHubRepos();
  });

// Di main.js
const blogPosts = [
    {
        title: "Belajar JavaScript Dasar",
        content: "Panduan lengkap untuk pemula...",
        date: "2024-03-01"
    }
];

function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    blogPosts.forEach(post => {
        blogContainer.innerHTML += `
            <article class="blog-post">
                <h3>${post.title}</h3>
                <small>${post.date}</small>
                <p>${post.content}</p>
                <a href="#" class="read-more">Baca Selengkapnya →</a>
            </article>
        `;
    });
}

// Panggil fungsi render
renderBlogPosts();

// Di main.js
document.getElementById('terminal-command').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = e.target.value;
        const output = document.getElementById('terminal-output');
        
        // Tambahkan logika perintah
        if (command === 'help') {
            output.innerHTML += `<p>> ${command}</p><p>Available commands: help, about, projects</p>`;
        }
        
        e.target.value = '';
    }
});

// Animasi Scroll untuk Testimonial
const testimonialCards = document.querySelectorAll('.testimonial-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

testimonialCards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});
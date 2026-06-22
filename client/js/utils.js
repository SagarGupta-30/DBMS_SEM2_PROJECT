/* ============================================================
   SocialConnect — Shared Utilities & Global UI Logic
   ============================================================ */

const utils = {
  // Toast notifications
  toast(message, type = 'success', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
      <span>${icon}</span>
      <div>${message}</div>
      <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => toast.remove());
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('toast-exit');
        toast.addEventListener('animationend', () => toast.remove());
      }
    }, duration);
  },

  // Format timestamp nicely
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  },

  // Parse post text to make hashtags clickable
  parseHashtags(text) {
    return text.replace(/#(\w+)/g, '<span class="hashtag" onclick="window.location.href=\'explore.html?tag=$1\'">#$1</span>');
  },

  // Get User Initials (for fallback avatars)
  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  // Common Header/Navigation Loader
  loadNavigation(activeLink) {
    const layout = document.querySelector('.app-layout');
    if (!layout) return;

    const user = api.getCurrentUser();
    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.id = 'app-sidebar';
    
    const initials = this.getInitials(user.username);
    const avatarContent = initials;

    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <h2 class="text-gradient">SocialConnect</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="feed.html" class="sidebar-link ${activeLink === 'feed' ? 'active' : ''}">
          <span class="icon">🏠</span> Feed
        </a>
        <a href="explore.html" class="sidebar-link ${activeLink === 'explore' ? 'active' : ''}">
          <span class="icon">🔍</span> Explore
        </a>
        <a href="messages.html" class="sidebar-link ${activeLink === 'messages' ? 'active' : ''}">
          <span class="icon">💬</span> Messages
        </a>
        <a href="groups.html" class="sidebar-link ${activeLink === 'groups' ? 'active' : ''}">
          <span class="icon">👥</span> Groups
        </a>
        <a href="profile.html" class="sidebar-link ${activeLink === 'profile' ? 'active' : ''}">
          <span class="icon">👤</span> Profile
        </a>
        <a href="admin.html" class="sidebar-link ${activeLink === 'admin' ? 'active' : ''}">
          <span class="icon">📊</span> Admin
        </a>
        <a href="#" id="logout-link" class="sidebar-link">
          <span class="icon">🚪</span> Logout
        </a>
      </nav>
      <div class="sidebar-user" onclick="window.location.href='profile.html'">
        <div class="avatar avatar-sm">${avatarContent}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${user.username}</div>
        </div>
      </div>
    `;

    layout.insertBefore(sidebar, layout.firstChild);

    // Mobile Hamburger
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '☰';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
          sidebar.classList.remove('open');
        }
      }
    });

    // Logout action
    document.getElementById('logout-link').addEventListener('click', (e) => {
      e.preventDefault();
      api.logout();
    });
  }
};

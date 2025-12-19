document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('posts-container');
  if (!container) return;

  try {
    const res = await fetch('/api/posts?type=post');
    const posts = await res.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<p class="empty">لا توجد مقالات حالياً</p>';
      return;
    }

    container.innerHTML = posts.map(p => `
      <article class="card">
        <h2>${p.title}</h2>
        <p class="summary">${p.summary || ''}</p>
        <div class="meta">
          <span>${new Date(p.created_at).toLocaleDateString('ar-EG')}</span>
          <a href="post.html?id=${p.id}">اقرأ المقال</a>
        </div>
      </article>
    `).join('');
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p class="empty">فشل تحميل المقالات</p>';
  }
});

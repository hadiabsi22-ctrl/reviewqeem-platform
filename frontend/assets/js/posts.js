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

    container.innerHTML = posts.map(post => `
      <article class="card">
        <h2>${post.title}</h2>
        <p class="summary">${post.summary || ''}</p>
        <div class="meta">
          <span>${new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
          <a href="post.html?id=${post.id}">اقرأ المقال</a>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="empty">فشل تحميل المقالات</p>';
  }
});

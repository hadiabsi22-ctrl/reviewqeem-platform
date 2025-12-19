document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('theories-container');
  if (!container) return;

  try {
    const res = await fetch('/api/posts?type=theory');
    const theories = await res.json();

    if (!Array.isArray(theories) || theories.length === 0) {
      container.innerHTML = '<p class="empty">لا توجد نظريات حالياً</p>';
      return;
    }

    container.innerHTML = theories.map(theory => `
      <article class="card">
        <h2>${theory.title}</h2>
        <p class="summary">${theory.summary || ''}</p>
        <div class="meta">
          <span>${new Date(theory.created_at).toLocaleDateString('ar-EG')}</span>
          <a href="theory.html?id=${theory.id}">اقرأ النظرية</a>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="empty">فشل تحميل النظريات</p>';
  }
});

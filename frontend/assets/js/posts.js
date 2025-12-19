document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const titleEl = document.getElementById('post-title');
  const summaryEl = document.getElementById('post-summary');
  const contentEl = document.getElementById('post-content');

  try {
    const res = await fetch(`/api/posts/${id}`);
    const post = await res.json();

    titleEl.textContent = post.title;
    summaryEl.textContent = post.summary || '';

    // Render blocks
    post.blocks.forEach(block => {
      if (block.type === 'text') {
        const p = document.createElement('p');
        p.className = 'text-block';
        p.textContent = block.content;
        contentEl.appendChild(p);
      }

      if (block.type === 'image') {
        const img = document.createElement('img');
        img.className = 'image-block';
        img.src = block.content;
        img.alt = post.title;
        contentEl.appendChild(img);
      }
    });

  } catch (err) {
    contentEl.innerHTML = '<p class="empty">فشل تحميل المحتوى</p>';
  }
});

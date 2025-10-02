fetch('http://localhost:3000/api/categories')
  .then(res => res.json())
  .then(categories => {
    const select = document.getElementById('category');
    categories.forEach(c => {
      const option = document.createElement('option');
      option.value = c.category_id;
      option.textContent = c.category_name;
      select.appendChild(option);
    });
  });

document.getElementById('search-form').addEventListener('submit', e => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const category = document.getElementById('category').value;

  let url = `http://localhost:3000/api/search?`;
  if (date) url += `date=${date}&`;
  if (location) url += `location=${location}&`;
  if (category) url += `category_id=${category}&`;

  fetch(url)
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById('results');
      container.innerHTML = '';
      if (events.length === 0) {
        container.textContent = '没有找到匹配的活动。';
        return;
      }
      events.forEach(e => {
        container.innerHTML += `
          <div>
            <h3>${e.event_name}</h3>
            <p>${e.category_name} | ${e.location}</p>
            <a href="event.html?id=${e.event_id}">查看详情</a>
          </div>
        `;
      });
    });
});

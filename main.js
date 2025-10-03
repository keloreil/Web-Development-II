fetch('http://localhost:3000/api/events')
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById('event-list');
    container.innerHTML = '';
    events.forEach(e => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${e.event_name}</h3>
        <p>${e.category_name} | ${e.location} | ${new Date(e.event_datetime).toLocaleString()}</p>
        <a href="event.html?id=${e.id}">查看详情</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('event-list').textContent = '加载失败: ' + err;
  });

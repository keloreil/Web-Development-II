// search.js

// Retrieve category data and fill in the dropdown menu
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

// Search Form Submission Event
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
        container.textContent = 'No matching events found.';
        return;
      }

      events.forEach(ev => {
        // Calculate fundraising progress percentage
        let percent = 0;
        if (ev.goal_amount && ev.goal_amount > 0) {
          percent = Math.min((ev.current_amount / ev.goal_amount) * 100, 100);
        }

        // Create activity block
        const div = document.createElement('div');
        div.classList.add('event-item');
        div.innerHTML = `
          <h3>${ev.event_name}</h3>
          <p><strong>Date:</strong> ${new Date(ev.event_datetime).toLocaleString()}</p>
          <p><strong>Location:</strong> ${ev.location}</p>
          <p><strong>Category:</strong> ${ev.category_name}</p>
          <p><strong>Organizer:</strong> ${ev.organization_name}</p>
          <p><strong>Ticket Price:</strong> $${ev.ticket_price}</p>
          <p><strong>Fundraising Goal:</strong> $${ev.goal_amount}</p>
          <p><strong>Amount Raised:</strong> $${ev.current_amount}</p>
          <div class="progress-bar">
            <div class="progress-bar-inner" style="width:${percent}%"></div>
          </div>
          <p><strong>Contact:</strong> ${ev.contact_details || 'N/A'}</p>
          <a href="event.html?id=${ev.event_id}">View Details</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('❌ Search failed:', err);
      document.getElementById('results').textContent = 'Failed to load events. Check console.';
    });
});

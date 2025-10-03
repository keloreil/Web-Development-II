// search.js

// Load categories dynamically
fetch('/api/categories')
  .then(res => res.json())
  .then(categories => {
    const select = document.getElementById('category');
    categories.forEach(c => {
      const option = document.createElement('option');
      option.value = c.category_name; // use name for filter
      option.textContent = c.category_name;
      select.appendChild(option);
    });
  });

// Helper: check past or upcoming
function getEventStatus(eventDate) {
  const now = new Date();
  return eventDate < now ? "Past" : "Upcoming";
}

// Handle search form
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value.trim();
  const category = document.getElementById('category').value;

  try {
    const res = await fetch('/api/events');
    const events = await res.json();

    const filtered = events.filter(ev => {
      let match = true;
      if (date && !ev.event_datetime.startsWith(date)) match = false;
      if (location && !ev.location.includes(location)) match = false;
      if (category && ev.category_name !== category) match = false;
      return match;
    });

    const container = document.getElementById('search-results');
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.textContent = "No events found.";
      return;
    }

    filtered.forEach(ev => {
      const div = document.createElement('div');
      div.classList.add('event-item');

      let percent = 0;
      if (ev.goal_amount && ev.goal_amount > 0) {
        percent = Math.min((ev.current_amount / ev.goal_amount) * 100, 100);
      }

      const eventDate = new Date(ev.event_datetime);
      const status = getEventStatus(eventDate);

      div.innerHTML = `
        <h3>${ev.event_name}</h3>
        <p><strong>Time:</strong> ${eventDate.toLocaleString()}</p>
        <p><strong>Location:</strong> ${ev.location}</p>
        <p><strong>Ticket Price:</strong> $${ev.ticket_price}</p>
        <p><strong>Category:</strong> ${ev.category_name}</p>
        <p><strong>Organizer:</strong> ${ev.organization_name}</p>
        <p><strong>Goal Amount:</strong> $${ev.goal_amount}</p>
        <p><strong>Amount Raised:</strong> $${ev.current_amount}</p>
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width:${percent}%"></div>
        </div>
        <p><strong>Contact:</strong> ${ev.contact_details || "N/A"}</p>
        <p class="status ${status === "Past" ? "past" : "upcoming"}">Status: ${status}</p>

        <div class="card-footer" style="margin-top:10px;">
          <a class="btn details" href="event.html?id=${ev.event_id}">View Details</a>
          <a class="btn register" href="event.html?id=${ev.event_id}#register" onclick="event.preventDefault(); alert('This feature is currently under construction.')">Register</a>
        </div>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Search failed:", err);
    document.getElementById('search-results').textContent = "Search failed. Check console.";
  }
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('search-form').reset();
  document.getElementById('search-results').textContent = "Use the form above to search events.";
});

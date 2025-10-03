// event.js

// Retrieve the eventId from the URL parameter
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

if (!eventId) {
  document.getElementById('event-title').textContent = "Event not found";
  document.getElementById('event-description').textContent = "";
  document.getElementById('event-info').textContent = "No event ID provided in the URL.";
} else {
  // Request backend API to obtain specified activity details
  fetch(`/api/events/${eventId}`)
    .then(res => {
      if (!res.ok) throw new Error("Event not found");
      return res.json();
    })
    .then(e => {
      // Display activity title and description
      document.getElementById('event-title').textContent = e.event_name || "Untitled Event";
      document.getElementById('event-description').textContent = e.description || "";

      // Amount formatting tool
      const fmt = num => Number(num || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      // Fill in activity information
      document.getElementById('event-info').innerHTML = `
        <p><strong>Organization:</strong> ${e.organization_name || "N/A"}</p>
        <p><strong>Category:</strong> ${e.category_name || "N/A"}</p>
        <p><strong>Time:</strong> ${e.event_datetime ? new Date(e.event_datetime).toLocaleString() : "TBD"}</p>
        <p><strong>Location:</strong> ${e.location || "TBD"}</p>
        <p><strong>Ticket:</strong> $${fmt(e.ticket_price)}</p>
        <p><strong>Fundraising Goal:</strong> $${fmt(e.goal_amount)}</p>
        <p><strong>Raised amount:</strong> $${fmt(e.current_amount)}</p>
        <p><strong>Contact Information:</strong> ${e.contact_details || "N/A"}</p>
      `;
    })
    .catch(err => {
      console.error(" Failed to load event:", err);
      document.getElementById('event-title').textContent = "Event not found";
      document.getElementById('event-description').textContent = "";
      document.getElementById('event-info').textContent = "Sorry, we couldn't load this event.";
    });
}

// Registration button prompt function
document.getElementById('register-btn').addEventListener('click', () => {
  alert('This feature is currently under construction.');
});

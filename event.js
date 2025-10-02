const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

fetch(`http://localhost:3000/api/events/${eventId}`)
  .then(res => res.json())
  .then(e => {
    document.getElementById('event-title').textContent = e.event_name;
    document.getElementById('event-description').textContent = e.description;
    document.getElementById('event-info').innerHTML = `
      <p>organization: ${e.organization_name}</p>
      <p>category: ${e.category_name}</p>
      <p>time: ${new Date(e.event_datetime).toLocaleString()}</p>
      <p>location: ${e.location}</p>
      <p>ticket: $${e.ticket_price}</p>
      <p>Fundraising Goal: $${e.goal_amount}</p>
      <p>Raised amount: $${e.current_amount}</p>
      <p>Contact Information: ${e.contact_details}</p>
    `;
  });

document.getElementById('register-btn').addEventListener('click', () => {
  alert('This feature is currently under construction.');
});

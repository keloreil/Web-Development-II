const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

fetch(`http://localhost:3000/api/events/${eventId}`)
  .then(res => res.json())
  .then(e => {
    document.getElementById('event-title').textContent = e.event_name;
    document.getElementById('event-description').textContent = e.description;
    document.getElementById('event-info').innerHTML = `
      <p>组织: ${e.organization_name}</p>
      <p>类别: ${e.category_name}</p>
      <p>时间: ${new Date(e.event_datetime).toLocaleString()}</p>
      <p>地点: ${e.location}</p>
      <p>票价: $${e.ticket_price}</p>
      <p>筹款目标: $${e.goal_amount}</p>
      <p>已筹金额: $${e.current_amount}</p>
      <p>联系方式: ${e.contact_details}</p>
    `;
  });

document.getElementById('register-btn').addEventListener('click', () => {
  alert('This feature is currently under construction.');
});

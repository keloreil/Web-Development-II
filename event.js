// event.js

// 获取 URL 参数中的 eventId
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

if (!eventId) {
  document.getElementById('event-title').textContent = "Event not found";
  document.getElementById('event-description').textContent = "";
  document.getElementById('event-info').textContent = "No event ID provided in the URL.";
} else {
  // 请求后端 API 获取指定活动详情
  fetch(`/api/events/${eventId}`)
    .then(res => {
      if (!res.ok) throw new Error("Event not found");
      return res.json();
    })
    .then(e => {
      // 显示活动标题和描述
      document.getElementById('event-title').textContent = e.event_name || "Untitled Event";
      document.getElementById('event-description').textContent = e.description || "";

      // 金额格式化工具
      const fmt = num => Number(num || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      // 填充活动信息
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
      console.error("❌ Failed to load event:", err);
      document.getElementById('event-title').textContent = "Event not found";
      document.getElementById('event-description').textContent = "";
      document.getElementById('event-info').textContent = "Sorry, we couldn't load this event.";
    });
}

// 注册按钮提示功能
document.getElementById('register-btn').addEventListener('click', () => {
  alert('This feature is currently under construction.');
});

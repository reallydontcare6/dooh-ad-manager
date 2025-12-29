async function loadCampaigns() {
  try {
    const res = await fetch('http://localhost:3000/api/campaigns');
    const campaigns = await res.json();

    const container = document.getElementById('campaigns');
    container.innerHTML = '';

    campaigns.forEach(campaign => {
      const div = document.createElement('div');
      div.className = 'campaign';

      div.innerHTML = `
        <h2>Campaign ID</h2>
        <p><strong>Start:</strong> ${new Date(campaign.startTime).toLocaleString()}</p>
        <p><strong>End:</strong> ${new Date(campaign.endTime).toLocaleString()}</p>

        <h3>Screens</h3>
        <ul>
          ${campaign.screens.map(s => `
            <li>${s.screen.name} (${s.screen.location})</li>
          `).join('')}
        </ul>

        <h3>Ads</h3>
        <ul>
          ${campaign.ads.map(a => `
            <li>Order ${a.playOrder}: ${a.ad.title}</li>
          `).join('')}
        </ul>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert('Failed to load campaigns');
  }
}

loadCampaigns();

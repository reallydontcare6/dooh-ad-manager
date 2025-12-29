const express = require('express');
const app = express();
const prisma = require('./prisma');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
app.use(cors());          
app.use(express.json());

app.use(express.json());
const screenRoutes = require('./routes/screens');
app.use('/api/screens', screenRoutes);
const adRoutes = require('./routes/ads');
app.use('/api/ads', adRoutes);
const campaignRoutes = require('./routes/campaigns');
app.use('/api/campaigns', campaignRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', db: 'not connected' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  const { name, location, resolution, status } = req.body;

  // basic validation
  if (!name || !location || !resolution || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const screen = await prisma.screen.create({
      data: {
        name,
        location,
        resolution,
        status,
      },
    });

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create screen' });
  }
});

module.exports = router;
router.get('/', async (req, res) => {
  try {
    const screens = await prisma.screen.findMany();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch screens' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, resolution, status } = req.body;

  try {
    const screen = await prisma.screen.update({
      where: { id },
      data: {
        name,
        location,
        resolution,
        status,
      },
    });

    res.status(200).json(screen);
  } catch (error) {
    res.status(404).json({ error: 'Screen not found' });
  }
});

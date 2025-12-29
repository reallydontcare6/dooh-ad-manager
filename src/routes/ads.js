const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  const { title, media_url, duration_seconds, media_type } = req.body;

  // basic validation
  if (!title || !media_url || !duration_seconds || !media_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!['image', 'video'].includes(media_type)) {
    return res.status(400).json({ error: 'Invalid media_type' });
  }

  try {
    const ad = await prisma.ad.create({
      data: {
        title,
        mediaUrl: media_url,
        durationSeconds: duration_seconds,
        mediaType: media_type,
      },
    });

    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ad' });
  }
});
router.get('/', async (req, res) => {
  try {
    const ads = await prisma.ad.findMany();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ads' });
  }
});

module.exports = router;

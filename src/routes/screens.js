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
router.get("/:id/playlist", async (req, res) => {
  try {
    const screenId = req.params.id;
    const at = req.query.at;

    if (!at) {
      return res.status(400).json({ error: "Missing 'at' query parameter" });
    }

    const atTime = new Date(at);

    const campaigns = await prisma.campaign.findMany({
      where: {
        startTime: { lte: atTime },
        endTime: { gte: atTime },
        screens: {
          some: {
            screenId: screenId,
          },
        },
      },
      include: {
        ads: {
          orderBy: { playOrder: "asc" },
          include: {
            ad: true,
          },
        },
      },
    });

    const playlist = campaigns.flatMap((campaign) =>
      campaign.ads.map((entry) => ({
        adId: entry.ad.id,
        title: entry.ad.title,
        mediaUrl: entry.ad.mediaUrl,
        durationSeconds: entry.ad.durationSeconds,
        mediaType: entry.ad.mediaType,
        playOrder: entry.playOrder,
      }))
    );

    res.json({
      screenId,
      at: atTime.toISOString(),
      playlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlist" });
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


const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create a campaign
 *     description: Creates a campaign, links screens and ads, and prevents time overlap.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *               - end_time
 *               - screen_ids
 *               - ads
 *     responses:
 *       201:
 *         description: Campaign created
 *       409:
 *         description: Campaign time overlap
 */

router.post('/', async (req, res) => {
  const { start_time, end_time, screen_ids, ads } = req.body;

  // basic validation
  if (!start_time || !end_time || !screen_ids || !ads) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!Array.isArray(screen_ids) || screen_ids.length === 0) {
    return res.status(400).json({ error: 'screen_ids must be a non-empty array' });
  }

  if (!Array.isArray(ads) || ads.length === 0) {
    return res.status(400).json({ error: 'ads must be a non-empty array' });
  }
// check for overlapping campaigns on same screens
const overlapping = await prisma.campaignScreen.findFirst({
  where: {
    screenId: { in: screen_ids },
    campaign: {
      startTime: { lt: new Date(end_time) },
      endTime: { gt: new Date(start_time) },
    },
  },
});

if (overlapping) {
  return res.status(409).json({
    error: 'Campaign time overlaps with an existing campaign on one or more screens',
  });
}

  try {
    const campaign = await prisma.campaign.create({
      data: {
        startTime: new Date(start_time),
        endTime: new Date(end_time),
      },
    });

    // link screens
    for (const screenId of screen_ids) {
      await prisma.campaignScreen.create({
        data: {
          campaignId: campaign.id,
          screenId,
        },
      });
    }

    // link ads with play order
    for (const ad of ads) {
      await prisma.campaignAd.create({
        data: {
          campaignId: campaign.id,
          adId: ad.ad_id,
          playOrder: ad.play_order,
        },
      });
    }

    res.status(201).json({ id: campaign.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create campaign' ,details: error.message});
  }
});
router.get('/', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        screens: {
          include: {
            screen: true,
          },
        },
        ads: {
          include: {
            ad: true,
          },
          orderBy: {
            playOrder: 'asc',
          },
        },
      },
    });

    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

module.exports = router;

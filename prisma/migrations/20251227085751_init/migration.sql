-- CreateTable
CREATE TABLE "Screen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "mediaType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignScreen" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,

    CONSTRAINT "CampaignScreen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignAd" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "playOrder" INTEGER NOT NULL,

    CONSTRAINT "CampaignAd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofOfPlay" (
    "id" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProofOfPlay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignScreen" ADD CONSTRAINT "CampaignScreen_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignScreen" ADD CONSTRAINT "CampaignScreen_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignAd" ADD CONSTRAINT "CampaignAd_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignAd" ADD CONSTRAINT "CampaignAd_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

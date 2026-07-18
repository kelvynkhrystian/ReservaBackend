-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL,
    "system_name" TEXT NOT NULL,
    "slogan" TEXT,
    "logo" TEXT,
    "reservation_interval" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

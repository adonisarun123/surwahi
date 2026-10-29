-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'MANAGER', 'EDITOR');

-- CreateEnum
CREATE TYPE "AccommodationCategory" AS ENUM ('SUITE', 'DORMITORY', 'CAMPING');

-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('PER_UNIT', 'PER_PERSON');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('REQUESTED', 'AWAITING_PAYMENT', 'CONFIRMED', 'DECLINED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "ReservationSource" AS ENUM ('WEBSITE', 'PHONE', 'WHATSAPP', 'WALK_IN', 'AIRBNB', 'BOOKING_COM', 'OTHER');

-- CreateEnum
CREATE TYPE "BlockSource" AS ENUM ('MANUAL', 'ICAL');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT,
    "data" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "AccommodationCategory" NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "bed_configuration" TEXT NOT NULL,
    "size" TEXT,
    "view" TEXT,
    "location" TEXT,
    "max_occupancy" INTEGER NOT NULL,
    "pricing_model" "PricingModel" NOT NULL,
    "base_price" INTEGER NOT NULL,
    "extra_adult_price" INTEGER,
    "included_adults" INTEGER,
    "child_price" INTEGER,
    "gst_percent" DECIMAL(5,2) NOT NULL DEFAULT 18,
    "meal_plan" TEXT NOT NULL,
    "amenities" TEXT[],
    "eco_features" TEXT[],
    "accessibility" TEXT[],
    "included" TEXT[],
    "policies" JSONB NOT NULL DEFAULT '{}',
    "keywords" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "ical_export_token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "provider_file_id" TEXT,
    "file_path" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "tags" TEXT[],
    "gallery_category" TEXT,
    "gallery_sort" INTEGER NOT NULL DEFAULT 0,
    "uploaded_by_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodation_images" (
    "accommodation_id" UUID NOT NULL,
    "media_id" UUID NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "caption" TEXT,

    CONSTRAINT "accommodation_images_pkey" PRIMARY KEY ("accommodation_id","media_id")
);

-- CreateTable
CREATE TABLE "rate_rules" (
    "id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "base_price" INTEGER NOT NULL,
    "extra_adult_price" INTEGER,
    "min_nights" INTEGER,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "rate_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "accommodation_id" UUID NOT NULL,
    "check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "exclusive" BOOLEAN NOT NULL DEFAULT false,
    "guest_name" TEXT NOT NULL,
    "guest_email" TEXT NOT NULL,
    "guest_phone" TEXT NOT NULL,
    "special_requests" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'REQUESTED',
    "source" "ReservationSource" NOT NULL DEFAULT 'WEBSITE',
    "subtotal" INTEGER NOT NULL,
    "gst" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "price_breakdown" JSONB NOT NULL,
    "payment_link_url" TEXT,
    "payment_link_id" TEXT,
    "amount_paid" INTEGER NOT NULL DEFAULT 0,
    "paid_at" TIMESTAMPTZ,
    "internal_notes" TEXT,
    "created_by_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_blocks" (
    "id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "reason" TEXT,
    "source" "BlockSource" NOT NULL DEFAULT 'MANUAL',
    "ical_feed_id" UUID,
    "external_uid" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "calendar_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ical_feeds" (
    "id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_synced_at" TIMESTAMPTZ,
    "last_status" TEXT,
    "last_error" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ical_feeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sessions_token_hash_key" ON "admin_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "admin_sessions_user_id_idx" ON "admin_sessions"("user_id");

-- CreateIndex
CREATE INDEX "audit_log_entity_entity_id_idx" ON "audit_log"("entity", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_slug_key" ON "accommodations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_ical_export_token_key" ON "accommodations"("ical_export_token");

-- CreateIndex
CREATE INDEX "media_assets_gallery_category_idx" ON "media_assets"("gallery_category");

-- CreateIndex
CREATE INDEX "rate_rules_accommodation_id_start_date_end_date_idx" ON "rate_rules"("accommodation_id", "start_date", "end_date");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_code_key" ON "reservations"("code");

-- CreateIndex
CREATE INDEX "reservations_accommodation_id_check_in_check_out_idx" ON "reservations"("accommodation_id", "check_in", "check_out");

-- CreateIndex
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- CreateIndex
CREATE INDEX "calendar_blocks_accommodation_id_start_date_end_date_idx" ON "calendar_blocks"("accommodation_id", "start_date", "end_date");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_blocks_ical_feed_id_external_uid_key" ON "calendar_blocks"("ical_feed_id", "external_uid");

-- AddForeignKey
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation_images" ADD CONSTRAINT "accommodation_images_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation_images" ADD CONSTRAINT "accommodation_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_rules" ADD CONSTRAINT "rate_rules_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_blocks" ADD CONSTRAINT "calendar_blocks_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_blocks" ADD CONSTRAINT "calendar_blocks_ical_feed_id_fkey" FOREIGN KEY ("ical_feed_id") REFERENCES "ical_feeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ical_feeds" ADD CONSTRAINT "ical_feeds_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;


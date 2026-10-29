-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "hold_expires_at" TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "reservations_status_hold_expires_at_idx" ON "reservations"("status", "hold_expires_at");

-- Backfill: existing unpaid holds get 72h from their last update
UPDATE "reservations" SET "hold_expires_at" = "updated_at" + interval '72 hours'
WHERE "status" = 'AWAITING_PAYMENT' AND "hold_expires_at" IS NULL;

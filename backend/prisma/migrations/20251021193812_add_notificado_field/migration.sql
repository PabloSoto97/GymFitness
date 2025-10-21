/*
  Warnings:

  - Made the column `telefono` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFin` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Cliente_email_key";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "notificado" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "fechaInicio" DROP DEFAULT,
ALTER COLUMN "fechaFin" SET NOT NULL,
ALTER COLUMN "pagado" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "siteUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "siteUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "siteUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

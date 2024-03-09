-- CreateTable
CREATE TABLE "siteUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "siteUser_pkey" PRIMARY KEY ("id")
);

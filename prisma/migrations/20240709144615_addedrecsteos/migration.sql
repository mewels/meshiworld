-- CreateTable
CREATE TABLE "RecStep" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "recipeId" INTEGER,

    CONSTRAINT "RecStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecStep" ADD CONSTRAINT "RecStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

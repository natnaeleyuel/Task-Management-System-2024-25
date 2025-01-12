/*
  Warnings:

  - You are about to drop the `_TaskUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskUsers" DROP CONSTRAINT "_TaskUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskUsers" DROP CONSTRAINT "_TaskUsers_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_TaskUsers";

-- CreateTable
CREATE TABLE "_TaskAssignments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TaskAssignments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskAssignments_B_index" ON "_TaskAssignments"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskAssignments" ADD CONSTRAINT "_TaskAssignments_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskAssignments" ADD CONSTRAINT "_TaskAssignments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

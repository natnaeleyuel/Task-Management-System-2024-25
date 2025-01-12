/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_TaskAssignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TaskAssignments" DROP CONSTRAINT "_TaskAssignments_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskAssignments" DROP CONSTRAINT "_TaskAssignments_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_TaskAssignments";

-- CreateTable
CREATE TABLE "_UserTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserTasks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserTasks_B_index" ON "_UserTasks"("B");

-- AddForeignKey
ALTER TABLE "_UserTasks" ADD CONSTRAINT "_UserTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTasks" ADD CONSTRAINT "_UserTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `userCatalogCommentaryId` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "yearlyGoal" INTEGER NOT NULL DEFAULT 0,
    "booksReaded" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("booksReaded", "city", "country", "email", "fullname", "id", "password", "username", "yearlyGoal") SELECT "booksReaded", "city", "country", "email", "fullname", "id", "password", "username", "yearlyGoal" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

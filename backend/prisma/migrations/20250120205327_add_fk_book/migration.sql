/*
  Warnings:

  - Added the required column `fk_book` to the `UserBookAdvance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserBookAdvance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_user" INTEGER NOT NULL,
    "fk_book" INTEGER NOT NULL,
    "pagesReaded" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    CONSTRAINT "UserBookAdvance_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserBookAdvance_fk_book_fkey" FOREIGN KEY ("fk_book") REFERENCES "UserBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserBookAdvance" ("commentary", "fk_user", "id", "pagesReaded") SELECT "commentary", "fk_user", "id", "pagesReaded" FROM "UserBookAdvance";
DROP TABLE "UserBookAdvance";
ALTER TABLE "new_UserBookAdvance" RENAME TO "UserBookAdvance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

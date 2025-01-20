/*
  Warnings:

  - You are about to drop the column `status` on the `Friendship` table. All the data in the column will be lost.
  - Added the required column `current_socket` to the `Sockets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Friendship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    CONSTRAINT "Friendship_sender_fkey" FOREIGN KEY ("sender") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friendship_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Friendship" ("id", "receiver", "sender") SELECT "id", "receiver", "sender" FROM "Friendship";
DROP TABLE "Friendship";
ALTER TABLE "new_Friendship" RENAME TO "Friendship";
CREATE TABLE "new_Sockets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_user" INTEGER NOT NULL,
    "current_socket" TEXT NOT NULL,
    CONSTRAINT "Sockets_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sockets" ("fk_user", "id") SELECT "fk_user", "id" FROM "Sockets";
DROP TABLE "Sockets";
ALTER TABLE "new_Sockets" RENAME TO "Sockets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "yearlyGoal" INTEGER NOT NULL DEFAULT 0,
    "booksReaded" INTEGER NOT NULL DEFAULT 0,
    "userCatalogCommentaryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_user" INTEGER NOT NULL,
    "author" TEXT,
    "title" TEXT,
    "pageCount" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedDae" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "reviewDate" TEXT NOT NULL,
    "googleBookId" TEXT NOT NULL,
    CONSTRAINT "UserBook_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sockets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_user" INTEGER NOT NULL,
    CONSTRAINT "Sockets_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Friendship_sender_fkey" FOREIGN KEY ("sender") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friendship_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserBookAdvance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_user" INTEGER NOT NULL,
    "pagesReaded" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    CONSTRAINT "UserBookAdvance_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserCatalogCommentary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fk_visitor" INTEGER NOT NULL,
    "fk_usercatalog" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    CONSTRAINT "UserCatalogCommentary_fk_visitor_fkey" FOREIGN KEY ("fk_visitor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserCatalogCommentary_fk_usercatalog_fkey" FOREIGN KEY ("fk_usercatalog") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

/*
  Warnings:

  - You are about to drop the column `uuid` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Account` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Wallet" ("id") SELECT "id" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "walletId" INTEGER NOT NULL,
    "telegramAccountId" INTEGER,
    CONSTRAINT "Account_telegramAccountId_fkey" FOREIGN KEY ("telegramAccountId") REFERENCES "TelegramAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("banned", "id", "role", "telegramAccountId", "walletId") SELECT "banned", "id", "role", "telegramAccountId", "walletId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_walletId_key" ON "Account"("walletId");
CREATE UNIQUE INDEX "Account_telegramAccountId_key" ON "Account"("telegramAccountId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

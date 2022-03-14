-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "walletId" INTEGER NOT NULL,
    "telegramAccountId" INTEGER,
    CONSTRAINT "Account_telegramAccountId_fkey" FOREIGN KEY ("telegramAccountId") REFERENCES "TelegramAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TelegramAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CryptoWallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "walletId" INTEGER,
    "tokenId" INTEGER,
    CONSTRAINT "CryptoWallet_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CryptoWallet_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_uuid_key" ON "Account"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Account_walletId_key" ON "Account"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_telegramAccountId_key" ON "Account"("telegramAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_uuid_key" ON "Wallet"("uuid");

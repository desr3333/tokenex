-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cryptoWalletId" INTEGER,
    CONSTRAINT "Transaction_cryptoWalletId_fkey" FOREIGN KEY ("cryptoWalletId") REFERENCES "CryptoWallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

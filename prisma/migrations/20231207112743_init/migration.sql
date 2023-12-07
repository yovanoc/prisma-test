-- CreateTable
CREATE TABLE "Wrapper" (
    "id" TEXT NOT NULL,
    "dataId" TEXT NOT NULL,

    CONSTRAINT "Wrapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "data" INTEGER[],

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wrapper" ADD CONSTRAINT "Wrapper_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

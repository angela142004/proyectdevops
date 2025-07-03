-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "enlace" TEXT NOT NULL,
    "pagina" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

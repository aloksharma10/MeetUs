import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const user = auth();
  if (!user) throw new Error("Unauthorized");
  return { userId: user };

}

export const ourFileRouter = {
  serverImages: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),

  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
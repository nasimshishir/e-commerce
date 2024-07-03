import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";

export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});

export async function DELETE(req: Request) {
    const { fileKey } = await req.json()
    const utAPi = new UTApi()
    await utAPi.deleteFiles(fileKey)

    return Response.json({ message: "Image Deleted" })
}
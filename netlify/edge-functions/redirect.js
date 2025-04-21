export default async function handler(request) {
  const url = new URL(request.url);
  console.log("url", url);
  const path = url.pathname;
  console.log("path", path);
  // Normalize the path
  let proxyPath = path;

  // Remove leading `/blogs` so we can append to the external URL
  if (path === "/blogs" || path === "/blogs/") {
    proxyPath = ""; // Root of the blog
  } else if (path.startsWith("/blogs/")) {
    proxyPath = path.replace("/blogs", ""); // e.g., /ashu or /category/post
  } else {
    // Not a /blogs route, ignore
    return;
  }

  const externalUrl = `https://sheetwa222.netlify.app/blogs${proxyPath}`;
  console.log("externalUrl", externalUrl);
  const proxyRes = await fetch(externalUrl, {
    headers: {
      "User-Agent": request.headers.get("user-agent") || "",
    },
  });
  console.log("check proxyRes", proxyRes);
  const contentType = proxyRes.headers.get("content-type") || "text/html";

  return new Response(await proxyRes.text(), {
    status: proxyRes.status,
    headers: {
      "Content-Type": contentType,
    },
  });
}

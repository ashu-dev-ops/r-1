export default async function handler(request) {
  const url = new URL(request.url);

  // Skip if the URL already ends with a slash or contains a file extension
  if (url.pathname.endsWith("/") || url.pathname.includes(".")) {
    return;
  }

  // Only enforce for /blogs/ paths
  if (url.pathname.startsWith("/blogs")) {
    // Add trailing slash to /blogs/ path if it doesn't have one
    const newUrl = `${url.origin}${url.pathname}/`; // Ensure trailing slash

    // Preserve query parameters, if any
    if (url.search) {
      return Response.redirect(`${newUrl}${url.search}`, 301);
    }
    return Response.redirect(newUrl, 301);
  }

  // For other paths, do not enforce trailing slashes
  return;
}

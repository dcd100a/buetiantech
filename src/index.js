const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzViaeevwj6GDWxbJK73EYwaN8u2vggcDxQiOcHW8ho1PhntthweHfOeQHDP2FjJ7tqPA/exec";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/products") {
      try {
        const response = await fetch(SHEET_API_URL, {
          redirect: "follow",
        });

        if (!response.ok) {
          throw new Error(`Sheet API returned ${response.status}`);
        }

        const data = await response.text();

        return new Response(data, {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Cache-Control": "no-store",
          },
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Products could not be loaded",
          },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};

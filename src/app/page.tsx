import kv from "@vercel/kv";

export default async function Home() {
  // see how many people love us on GitHub
  const res = await fetch("https://api.github.com/repos/Wollivan/view-counter", { next: { revalidate: 15 } });
  const data = await res.json();

  // see how many times this page has been viewed
  const pageViews = await kv.incr("views");

  // make the numbr get bigger for each view
  const myStyles = {
    p: {
      fontSize: pageViews / 4 + "px",
    },
  };

  return (
    <main>
      <p style={myStyles.p}>{pageViews}</p>
      <span>⭐ {data.stargazers_count}</span>
    </main>
  );
}

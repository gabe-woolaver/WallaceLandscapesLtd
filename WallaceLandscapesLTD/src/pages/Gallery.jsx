export default function Gallery() {
  return (
    <article className="container padding-block">
      <header className="narrow">
        <h1>Gallery</h1>
        <p className="lead">
          A collage of recent work. Click any image to view larger.
        </p>
      </header>

      {/* Simple responsive grid (swap in your images later) */}
      <div className="grid-4">
        {[...Array(12)].map((_, i) => (
          <img
            key={i}
            src="/wallace-hero-opener.jpg"
            alt={`Gallery item ${i + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </article>
  );
}

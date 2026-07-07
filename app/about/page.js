export default function About() {
  return (
<div
  style={{
    maxWidth: "1300px",
    margin: "60px auto",
    padding: "50px",
    background: "#1c1c1c",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    color: "white",
  }}
>
  <h1
    style={{
      textAlign: "center",
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: "30px",
      color: "#e50914",
    }}
  >
    🎬 About Entertainment24/7
  </h1>

  <p
    style={{
      fontSize: "1.15rem",
      lineHeight: "2",
      textAlign: "justify",
      color: "#d8d8d8",
      marginBottom: "25px",
    }}
  >
    <strong style={{ color: "white" }}>Entertainment24/7</strong> is your
    ultimate destination for discovering the latest movies and games. Our
    platform is designed to help entertainment enthusiasts explore trending
    content, upcoming releases, ratings, trailers, and detailed information —
    all in one place.
  </p>

  <p
    style={{
      fontSize: "1.15rem",
      lineHeight: "2",
      textAlign: "justify",
      color: "#d8d8d8",
      marginBottom: "40px",
    }}
  >
    Whether you're searching for your next blockbuster movie or an exciting
    new game, Entertainment24/7 delivers a fast, clean, and user-friendly
    experience so you can spend less time searching and more time enjoying.
  </p>

  <h2
    style={{
      color: "#e50914",
      fontSize: "2rem",
      marginBottom: "20px",
    }}
  >
    What We Offer
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
      marginBottom: "45px",
    }}
  >
    <div
      style={{
        background: "#2a2a2a",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#fff" }}>
        🎬 Movies
      </h3>

      <p style={{ color: "#ccc", lineHeight: "1.8" }}>
        Browse trending, popular, and upcoming movies with detailed
        information and ratings.
      </p>
    </div>

    <div
      style={{
        background: "#2a2a2a",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#fff" }}>
        🎮 Games
      </h3>

      <p style={{ color: "#ccc", lineHeight: "1.8" }}>
        Discover newly released games, popular titles, and exciting gaming
        content.
      </p>
    </div>

    <div
      style={{
        background: "#2a2a2a",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#fff" }}>
        🔍 Smart Search
      </h3>

      <p style={{ color: "#ccc", lineHeight: "1.8" }}>
        Instantly search for your favorite movies and games with an easy and
        intuitive interface.
      </p>
    </div>
  </div>

  <h2
    style={{
      color: "#e50914",
      fontSize: "2rem",
      marginBottom: "20px",
    }}
  >
    Our Mission
  </h2>

  <p
    style={{
      fontSize: "1.15rem",
      lineHeight: "2",
      textAlign: "justify",
      color: "#d8d8d8",
      marginBottom: "45px",
    }}
  >
    Our mission is to create a simple, modern, and reliable platform where
    users can explore the world of movies and gaming anytime, anywhere.
    Entertainment24/7 is built for everyone who loves entertainment and wants
    quick access to quality content.
  </p>

  <div
    style={{
      marginTop: "20px",
      padding: "25px",
      textAlign: "center",
      background: "#e50914",
      borderRadius: "12px",
    }}
  >
    <h2
      style={{
        margin: 0,
        color: "white",
        fontSize: "2rem",
      }}
    >
      Entertainment24/7
    </h2>

    <p
      style={{
        marginTop: "12px",
        fontSize: "1.2rem",
        color: "white",
      }}
    >
      Entertainment Never Stops.
    </p>
  </div>
</div>
    
  );
}
function EmailTemplate() {
  return (
    <div
      style={{
        backgroundColor: "#111624",
        padding: "20px",
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        minHeight: "500px",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <img
          src="https://ik.imagekit.io/oifol97s2/logo.svg?updatedAt=1737973604396"
          alt="Logo"
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "30px",
            fontWeight: "800",
          }}
        >
          SoftBooks
        </h1>
      </span>

      <h1
        style={{
          color: "#fff",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        {"header"}
      </h1>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: "12px",
          }}
        >
          Hi [username]
        </p>

        <p
          style={{
            color: "#fff",
            fontSize: "12px",
          }}
        >
          Welcome to BookWise! We're excited to have you join our community of
          book enthusiasts. Explore a wide range of books, borrow with ease, and
          manage your reading journey seamlessly.
        </p>

        <p
          style={{
            color: "#fff",
            fontSize: "12px",
          }}
        >
          Welcome to BookWise! We're excited to have you join our community of
          book enthusiasts. Explore a wide range of books, borrow with ease, and
          manage your reading journey seamlessly.{" "}
        </p>
      </span>
      <button
        style={{
          backgroundColor: "#EED1AC",
          color: "#282828",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        text
      </button>

      <span style={{}}>
        <p
          style={{
            color: "#fff",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          {"greetings"}
        </p>

        <p
          style={{
            color: "#fff",
            fontSize: "12px",
          }}
        >
          The SoftBooks Team
        </p>
      </span>
    </div>
  );
}

export default EmailTemplate;

function LiveCamera() {
  const cameraUrl = "http://127.0.0.1:5000/video_feed";

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>📷 Live Camera Feed</h2>

      <img
        src={cameraUrl}
        alt="Live Camera"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "2px solid #ddd",
        }}
      />
    </div>
  );
}

export default LiveCamera;
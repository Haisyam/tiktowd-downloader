let videoUrl = "";

async function fetchVideo() {
  const tiktokUrl = document.getElementById("tiktokUrl").value;
  const status = document.getElementById("status");
  const videoPreview = document.getElementById("videoPreview");
  const preview = document.getElementById("preview");

  status.textContent = "Mengambil video...";
  videoPreview.style.display = "none";

  try {
    const apiUrl = `https://api.ngodingaja.my.id/api/tiktok?url=${encodeURIComponent(
      tiktokUrl
    )}`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.hasil && response.data.hasil.tanpawm) {
      videoUrl = response.data.hasil.tanpawm;
      preview.src = videoUrl;

      videoPreview.style.display = "block";
      status.textContent = "Video berhasil diambil!";
      status.className = "text-center text-success";
    } else {
      throw new Error(
        "Gagal mendapatkan URL video tanpa watermark untuk diambil"
      );
    }
  } catch (error) {
    console.error("Error saat mengambil video TikTok:", error);
    status.textContent = "Error saat mengambil video TikTok: " + error.message;
    status.className = "text-center text-danger";
  }
}

async function downloadVideo() {
  const status = document.getElementById("status");
  status.textContent = "Mengunduh...";

  try {
    const videoResponse = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "blob",
    });

    const videoBlob = new Blob([videoResponse.data], {
      type: "video/mp4",
    });
    const fileName = `tiktok_video.mp4`;

    saveAs(videoBlob, fileName);

    status.textContent = "Video berhasil diunduh!";
    status.className = "text-center text-success";
  } catch (error) {
    console.error("Error saat mengunduh video TikTok:", error);
    status.textContent = "Error saat mengunduh video TikTok: " + error.message;
    status.className = "text-center text-danger";
  }
}

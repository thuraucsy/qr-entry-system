import QRCode from "react-qr-code";

function saveSvgAsImage() {
  const svgElement = document.getElementById("my-svg");
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngData = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = pngData;
    link.download = "svg-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

const QRGenerator = ({ value, setValue }) => {
  return (
    <div className="qr-generator">
      <QRCode id="my-svg" value={value} size={256} onChange={(e) => setValue(value)} />
      <button onClick={saveSvgAsImage}>Save as Image</button>
    </div>
  );
};

export default QRGenerator;
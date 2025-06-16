import QRCode from "react-qr-code";

const QRGenerator = ({ value }) => {
  return (
    <div className="qr-generator" id="qr-generator">
      <h2>&nbsp;</h2>
      <h2>&nbsp;</h2>
      <h2>&nbsp;</h2>
      <QRCode id="my-svg" value={value} size={150} />
      <p className="scan-to-check-in">Scan to check-in</p>
      <p>Place: <em>Okinawa Naha Hall</em></p>
      <p>Time: 2025-07-21 Monday 15:00 (check-in 14:30)</p>
    </div>
  );
};

export default QRGenerator;
import QRCode from "react-qr-code";

const QRGenerator = ({ value }) => {
  return (
    <div className="qr-generator">
      <QRCode id="my-svg" value={value} size={256} />
    </div>
  );
};

export default QRGenerator;
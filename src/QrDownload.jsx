import { Box, Typography, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import QRGenerator from "./QRGenerator.jsx";
import Swal from "sweetalert2";
import { fetchSheetData } from "./utils.js";
import html2canvas from "html2canvas";

const downloadQR = (event, setQrGeneratorValue) => {
    const rows = JSON.parse(event.currentTarget.getAttribute("data-param-rows"));
    const qrno = event.currentTarget.getAttribute("data-param-qrno");

    console.log("Rows:", (rows));
    console.log("QR No:", qrno);
    console.log("rows[qrno]:", rows[qrno]);

    if (rows[qrno]) {
        document.querySelector("meta[name=viewport]").setAttribute("content", "width=500");
        setQrGeneratorValue(rows[qrno][2]); // Assuming the QR code value is in the third column (index 2)
        setTimeout(() => saveSvgAsImage(qrno + ".png"), 1000);

        Swal.fire({
            text: "QR Code downloaded successfully",
            icon: "success",
        });
    } else {
        Swal.fire({
            text: "Not found",
            icon: "warning",
        });
    }
}

function saveSvgAsImage(imgName = "svg-image.png") {
    // const div = document.getElementById("qr-generator");
    // html2canvas(div).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const link = document.createElement("a");
    //     link.href = imgData;
    //     link.download = imgName;
    //     link.click();
    // });

    html2canvas(document.getElementById("qr-generator"), {
        scrollY: -window.scrollY
    }).then((canvas) => {
        // document.body.appendChild(canvas);

        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = imgName;
        link.click();
    });

    // const svgElement = document.getElementById("qr-generator");
    // const svgData = new XMLSerializer().serializeToString(svgElement);
    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // const img = new Image();

    // img.onload = function () {
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     ctx.drawImage(img, 0, 0);
    //     const pngData = canvas.toDataURL("image/png");

    //     // Create a download link
    //     const link = document.createElement("a");
    //     link.href = pngData;
    //     link.download = imgName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    // img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

export default function QrDownload() {
    const [rows, setRows] = useState([]);
    const [qrNo, setQrNo] = useState("");
    const [qrGeneratorVal, setQrGeneratorValue] = useState("");

    useEffect(() => {
        fetchSheetData().then(setRows);
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                QR Code Download
            </Typography>
            <NumericFormat
                customInput={TextField}
                size="small"
                variant="outlined"
                type="tel"
                value={qrNo}
                onChange={(e) => setQrNo(e.target.value)}
            />
            <IconButton>
                <DownloadIcon className="downloadIcon" onClick={(event) => downloadQR(event, setQrGeneratorValue)} data-param-rows={JSON.stringify(rows)} data-param-qrno={qrNo} />
            </IconButton>

            {qrGeneratorVal && <QRGenerator value={qrGeneratorVal} />}

            {/* <div>
                <h1>Google Sheets Data</h1>
                <ul>
                    {rows.map((row, index) => (
                        <li key={index}>{JSON.stringify(row)}</li>
                    ))}
                </ul>
            </div> */}
        </Box>
    );
}
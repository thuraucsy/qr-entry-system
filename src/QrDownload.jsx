import { Box, Typography, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import QRGenerator from "./QRGenerator.jsx";
import Swal from "sweetalert2";

const API_KEY = "AIzaSyBIAe6vFpQnxgSeVGXwwu3ESvbS8miyhGE";
const SPREADSHEET_ID = "1Eb1IRArcai5KaRhj3CaYIqForxfFifN4R5I91oXtgdo";
const SHEET_NAME = "Sheet1";

const fetchSheetData = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched data:", data);
    return data.values;
};

const downloadQR = (event, setQrGeneratorValue) => {
    const rows = JSON.parse(event.currentTarget.getAttribute("data-param-rows"));
    const qrno = event.currentTarget.getAttribute("data-param-qrno");

    console.log("Rows:", (rows));
    console.log("QR No:", qrno);
    console.log("rows[qrno]:", rows[qrno]);

    if (rows[qrno]) {
        setQrGeneratorValue(rows[qrno][2]); // Assuming the QR code value is in the third column (index 2)
        Swal.fire({
            text: "QR Code generated successfully",
            icon: "success",
        });
    } else {
        Swal.fire({
            text: "Not found",
            icon: "warning",
        });
    }
}

export default function QrDownload() {
    const [rows, setRows] = useState([]);
    const [qrNo, setQrNo] = useState(123);
    const [qrGeneratorVal, setQrGeneratorValue] = useState(123);

    useEffect(() => {
        fetchSheetData().then(setRows);
    }, []);


    fetchSheetData();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                QR Code Download
            </Typography>
            <NumericFormat
                customInput={TextField}
                size="small"
                variant="outlined"
                // sx={{ width: '30ch' }}
                thousandSeparator=","
                type="tel"
                value={qrNo}
            />
            <IconButton>
                <DownloadIcon className="downloadIcon" onClick={(event) => downloadQR(event, setQrGeneratorValue)} data-param-rows={JSON.stringify(rows)} data-param-qrno={qrNo} onChange={(e) => setQrNo(e.target.value)} />
            </IconButton>

            <QRGenerator value={qrGeneratorVal} setValue={setQrGeneratorValue} />

            <div>
                <h1>Google Sheets Data</h1>
                <ul>
                    {rows.map((row, index) => (
                        <li key={index}>{JSON.stringify(row)}</li>
                    ))}
                </ul>
            </div>
        </Box>
    );
}
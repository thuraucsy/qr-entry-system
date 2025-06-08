const API_KEY = "AIzaSyBIAe6vFpQnxgSeVGXwwu3ESvbS8miyhGE";
const SPREADSHEET_ID = "1Eb1IRArcai5KaRhj3CaYIqForxfFifN4R5I91oXtgdo";
const SHEET_NAME = "Sheet1";

export const fetchSheetData = async() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched data:", data);
    return data.values;
};
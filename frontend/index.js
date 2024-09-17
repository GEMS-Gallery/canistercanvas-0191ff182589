import { backend } from "declarations/backend";

let isDrawing = false;
let canvas, ctx;
let currentColor = "#000000";

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("drawingCanvas");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  document.getElementById("colorPicker").addEventListener("input", changeColor);
  document.getElementById("clearBtn").addEventListener("click", clearCanvas);
  document.getElementById("saveBtn").addEventListener("click", saveDrawing);
  document.getElementById("loadBtn").addEventListener("click", loadDrawings);
});

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function changeColor(e) {
  currentColor = e.target.value;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function saveDrawing() {
  const imageData = canvas.toDataURL();
  try {
    const result = await backend.saveDrawing(imageData);
    if ("ok" in result) {
      alert("Drawing saved successfully!");
    } else {
      alert("Failed to save drawing: " + result.err);
    }
  } catch (error) {
    console.error("Error saving drawing:", error);
    alert("An error occurred while saving the drawing.");
  }
}

async function loadDrawings() {
  try {
    const drawings = await backend.getDrawings();
    const savedDrawingsDiv = document.getElementById("savedDrawings");
    savedDrawingsDiv.innerHTML = "";

    drawings.forEach((drawing, index) => {
      const img = document.createElement("img");
      img.src = drawing.imageData;
      img.alt = `Drawing ${index + 1}`;
      img.width = 100;
      img.height = 100;
      savedDrawingsDiv.appendChild(img);
    });
  } catch (error) {
    console.error("Error loading drawings:", error);
    alert("An error occurred while loading the drawings.");
  }
}

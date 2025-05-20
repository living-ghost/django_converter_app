const fileInput = document.getElementById('docx-pdf');
const fileNameDisplay = document.getElementById('docx-file-name');
const fileLabelButton = document.getElementById('docx-pdf-label');

fileLabelButton.addEventListener('click', function() {
    fileInput.click();  // simulate click on hidden file input
});

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = "Choose file";
    }
});

const fileInput2 = document.getElementById('pdf-docx');
const fileNameDisplay2 = document.getElementById('pdf-file-name');
const fileLabelButton2 = document.getElementById('pdf-docx-label');

fileLabelButton2.addEventListener('click', function() {
    fileInput2.click();  // simulate click on hidden file input
});

fileInput2.addEventListener('change', function() {
    if (fileInput2.files.length > 0) {
        fileNameDisplay2.textContent = fileInput2.files[0].name;
    } else {
        fileNameDisplay2.textContent = "Choose file";
    }
});
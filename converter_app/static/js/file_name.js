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
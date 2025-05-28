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

const fileInput3 = document.getElementById('docx-txt');
const fileNameDisplay3 = document.getElementById('docx-file-name');
const fileLabelButton3 = document.getElementById('docx-txt-label');

fileLabelButton3.addEventListener('click', function() {
    fileInput3.click();  // simulate click on hidden file input
});

fileInput3.addEventListener('change', function() {
    if (fileInput3.files.length > 0) {
        fileNameDisplay3.textContent = fileInput3.files[0].name;
    } else {
        fileNameDisplay3.textContent = "Choose file";
    }
});

const fileInput4 = document.getElementById('jpg-png');
const fileNameDisplay4 = document.getElementById('jpg-file-name');
const fileLabelButton4 = document.getElementById('jpg-png-label');

fileLabelButton4.addEventListener('click', function() {
    fileInput4.click();  // simulate click on hidden file input
});

fileInput4.addEventListener('change', function() {
    if (fileInput4.files.length > 0) {
        fileNameDisplay4.textContent = fileInput4.files[0].name;
    } else {
        fileNameDisplay4.textContent = "Choose file";
    }
});

const fileInput5 = document.getElementById('png-jpg');
const fileNameDisplay5 = document.getElementById('png-file-name');
const fileLabelButton5 = document.getElementById('png-jpg-label');

fileLabelButton5.addEventListener('click', function() {
    fileInput5.click();  // simulate click on hidden file input
});

fileInput5.addEventListener('change', function() {
    if (fileInput5.files.length > 0) {
        fileNameDisplay5.textContent = fileInput5.files[0].name;
    } else {
        fileNameDisplay5.textContent = "Choose file";
    }
});

const fileInput6 = document.getElementById('img-pdf');
const fileNameDisplay6 = document.getElementById('img-file-name');
const fileLabelButton6 = document.getElementById('img-pdf-label');

fileLabelButton6.addEventListener('click', function() {
    fileInput6.click();  // simulate click on hidden file input
});

fileInput6.addEventListener('change', function() {
    if (fileInput6.files.length > 0) {
        fileNameDisplay6.textContent = fileInput6.files[0].name;
    } else {
        fileNameDisplay6.textContent = "Choose file";
    }
});
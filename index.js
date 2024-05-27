document.addEventListener("DOMContentLoaded", function() {
    const datePicker = document.getElementById("data");
    datePicker.addEventListener("click", function() {
        this.type = "date";
    });
});
document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const room = document.getElementById("room").value;
    const hostel = document.getElementById("hostel").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const paymentMethod = document.getElementById("payment-method").value;

    let totalAmount = quantity * 13;
    if (hostel !== "bh2") {
        totalAmount += 2; // Add delivery charge
    }

    document.getElementById("bill-quantity").textContent = quantity;
    document.getElementById("total-amount").textContent = totalAmount;
    document.getElementById("order-form").style.display = "none";
    document.getElementById("bill-section").style.display = "block";

    document.getElementById("pay-now").onclick = function () {
        if (paymentMethod === "cod") {
            sendWhatsAppMessage(name, mobile, room, hostel, quantity, totalAmount, "Cash on Delivery");
        } else {
            document.getElementById("bill-section").style.display = "none";
            document.getElementById("upi-section").style.display = "block";
        }
    };
});

function sendWhatsAppMessage(name, mobile, room, hostel, quantity, totalAmount, paymentMethod, transactionId = "") {
    const message = `Hi, my order details:\nName: ${name}\nMobile: ${mobile}\nHostel: ${hostel}\nRoom No: ${room}\nItem: Moong Dal\nQuantity: ${quantity}\nTotal Amount: ₹${totalAmount}\nPayment: ${paymentMethod}\nTransaction ID: ${transactionId}`;
    window.open(`https://wa.me/7668607168?text=${encodeURIComponent(message)}`, "_blank");
}

const upiApps = {
    gpay: "upi://pay?pa=yourUPIID@upi&pn=YourName&am=15&cu=INR",
    phonepe: "phonepe://pay?pa=yourUPIID@upi&pn=YourName&am=15&cu=INR",
    paytm: "paytmmp://pay?pa=yourUPIID@upi&pn=YourName&am=15&cu=INR"
};

document.querySelectorAll(".upi-button").forEach(button => {
    button.addEventListener("click", function () {
        const upiLink = upiApps[this.id];
        window.location.href = upiLink;
    });
});

document.getElementById("send-details").addEventListener("click", function () {
    const transactionId = document.getElementById("transaction-id").value.trim();
    if (transactionId.length >= 10) {
        sendWhatsAppMessage(document.getElementById("name").value, document.getElementById("mobile").value, document.getElementById("room").value, document.getElementById("hostel").value, document.getElementById("quantity").value, document.getElementById("total-amount").textContent, "UPI", transactionId);
    } else {
        alert("Please enter a valid 10-digit Transaction ID.");
    }
});

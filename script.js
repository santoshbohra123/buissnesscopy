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

// const upiApps = {
//     gpay: "upi://pay?pa=universebhaijan111-1@oksbi&pn=santoshbohra&am=15&cu=INR",
//     phonepe: "phonepe://pay?pa=7668607168@upi&pn=santoshbohra&am=15&cu=INR",
//     paytm: "paytmmp://pay?pa=7668607168@upi=santoshbohra&am=15&cu=INR"
// };

document.querySelectorAll(".upi-button").forEach(button => {
    button.addEventListener("click", function () {
        const upiLink = upiApps[this.id];
        window.location.href = upiLink;
    });
});

// document.getElementById("send-details").addEventListener("click", function () {
//     const transactionId = document.getElementById("transaction-id").value.trim();
//     if (transactionId.length >= 10) {
//         sendWhatsAppMessage(document.getElementById("name").value, document.getElementById("mobile").value, document.getElementById("room").value, document.getElementById("hostel").value, document.getElementById("quantity").value, document.getElementById("total-amount").textContent, "UPI", transactionId);
//     } else {
//         alert("Please enter a valid 10-digit Transaction ID.");
//     }
// });

document.getElementById("send-details").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const transactionId = document.getElementById("transaction-id").value.trim();

    if (!transactionId) {
        alert("Please enter a valid Transaction ID.");
        return;
    }

    const whatsappMessage = `Hi, my payment details:\nName: ${name}\nMobile: ${mobile}\nAmount: ₹${amount}\nTransaction ID: ${transactionId}`;
    window.open(`https://wa.me/7668607168?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

    alert("Payment details sent successfully!");
    window.location.href = "/";
});

function payWith(app) {
    const amount = document.getElementById("amount").value.trim();
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const upiID = "7668607168@upi";
    const name = "Ritesh Kanyal";
    const upiURL = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

    let appURL = "";
    if (app === "gpay") {
        appURL = `intent://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`;
    } else if (app === "phonepe") {
        appURL = `intent://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR#Intent;scheme=upi;package=com.phonepe.app;end;`;
    } else if (app === "paytm") {
        appURL = `intent://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR#Intent;scheme=upi;package=net.one97.paytm;end;`;
    }

    window.location.href = appURL;

    // Show UPI QR Code Section
    document.getElementById("upi-section").style.display = "block";
    new QRCode(document.getElementById("qrcode"), {
        text: upiURL,
        width: 150,
        height: 150
    });
}

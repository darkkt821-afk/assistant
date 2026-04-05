(async () => {

    // ===== UID CHECK =====
    const UID = "23862250"; // your uid

    const res = await fetch("https://raw.githubusercontent.com/darkkt821-afk/Assistant/main/users.json");
    const data = await res.json();

    if (!data.allowedUIDs.includes(UID)) {
        alert("Access Denied");
        return;
    }

    console.log("Access Granted");

    // ===== CREATE UI =====
    const box = document.createElement("div");
    box.style = `
        position: fixed;
        bottom: 80px;
        right: 10px;
        background: black;
        color: white;
        padding: 10px;
        border-radius: 10px;
        z-index: 9999;
    `;

    box.innerHTML = `
        <div style="margin-bottom:5px;">Auto Buyer</div>
        <input id="amountInput" placeholder="Enter Amount" style="width:100px;">
        <button id="startBtn">Start</button>
        <div id="status" style="margin-top:5px;">Idle</div>
    `;

    document.body.appendChild(box);

    // ===== AUTO BUY FUNCTION =====
    function startAutoBuy(amount) {
        document.getElementById("status").innerText = "Searching...";

        const interval = setInterval(() => {
            const items = document.querySelectorAll("div");

            items.forEach(el => {
                if (el.innerText.includes("₹" + amount)) {

                    const btn = el.parentElement.querySelector("button");

                    if (btn && btn.innerText === "Buy") {
                        btn.click();

                        document.getElementById("status").innerText = "Bought ₹" + amount;
                        clearInterval(interval);
                    }
                }
            });

        }, 1000);
    }

    // ===== BUTTON CLICK =====
    document.getElementById("startBtn").onclick = () => {
        const amt = document.getElementById("amountInput").value;
        if (!amt) return alert("Enter amount");

        startAutoBuy(amt);
    };

})();

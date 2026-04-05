console.log("MAIN JS LOADED");

// ===== UID CHECK =====
(async () => {

    const UID = "23862250";

    try {
        const res = await fetch("https://raw.githubusercontent.com/darkkt821-afk/assistant/main/users.json");
        const data = await res.json();

        if (!data.allowedUIDs.includes(UID)) {
            alert("Access Denied");
            return;
        }

        console.log("Access Granted");

        // ===== UI =====
        const box = document.createElement("div");
        box.style = `
            position: fixed;
            bottom: 80px;
            right: 10px;
            background: black;
            color: white;
            padding: 12px;
            border-radius: 12px;
            z-index: 9999;
            font-size: 14px;
        `;

        box.innerHTML = `
            <div style="margin-bottom:5px;">⚡ Auto Buyer</div>
            <input id="amountInput" placeholder="Amount" style="width:90px;">
            <button id="startBtn">Start</button>
            <div id="status" style="margin-top:5px;">Idle</div>
        `;

        document.body.appendChild(box);

        // ===== AUTO BUY =====
        function startAutoBuy(amount) {
            document.getElementById("status").innerText = "Searching...";

            const interval = setInterval(() => {
                const all = document.querySelectorAll("*");

                all.forEach(el => {
                    if (el.innerText && el.innerText.includes("₹" + amount)) {

                        let parent = el;

                        for (let i = 0; i < 5; i++) {
                            if (!parent) break;

                            const btn = parent.querySelector("button");

                            if (btn && btn.innerText.includes("Buy")) {
                                btn.click();

                                document.getElementById("status").innerText = "✅ Bought ₹" + amount;
                                clearInterval(interval);
                                return;
                            }

                            parent = parent.parentElement;
                        }
                    }
                });

            }, 800);
        }

        // ===== BUTTON =====
        document.getElementById("startBtn").onclick = () => {
            const amt = document.getElementById("amountInput").value;
            if (!amt) return alert("Enter amount");

            startAutoBuy(amt);
        };

    } catch (e) {
        console.log("Error:", e);
    }

})();

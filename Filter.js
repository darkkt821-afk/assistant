console.log("🔥 PRO TOOL LOADED");

// ===== HIDDEN UID =====
function getUID() {
    return atob("MjM4NjIyNTA=");
}

// ===== ACCESS CHECK =====
(async () => {

    const UID = getUID();

    try {
        const res = await fetch("https://raw.githubusercontent.com/darkkt821-afk/assistant/main/users.json");
        const data = await res.json();

        if (!data.allowedUIDs.includes(UID)) {
            alert("❌ Access Denied");
            return;
        }

        console.log("✅ Access Granted");

        // ===== UI =====
        const box = document.createElement("div");
        box.style = `
            position: fixed;
            bottom: 80px;
            right: 10px;
            background: #000;
            color: #0f0;
            padding: 12px;
            border-radius: 12px;
            z-index: 9999;
            font-size: 12px;
        `;

        box.innerHTML = `
            <div>⚡ Auto Buyer PRO</div>
            <input id="amt" placeholder="Amount" style="width:80px;">
            <button id="go">Start</button>
            <div id="st">Idle</div>
        `;

        document.body.appendChild(box);

        // ===== CORE ENGINE (CLONE STYLE) =====
        function start(amount) {

            let found = false;
            document.getElementById("st").innerText = "Searching...";

            const loop = setInterval(() => {

                // Get all cards (important)
                const cards = document.querySelectorAll("div");

                for (let card of cards) {

                    // skip if already found
                    if (found) break;

                    const text = card.innerText;

                    // exact match for ₹ amount
                    if (text && text.includes("₹" + amount)) {

                        // find BUY button inside same card
                        const btn = card.querySelector("button");

                        if (btn && btn.innerText.includes("Buy")) {

                            found = true;

                            btn.click();

                            document.getElementById("st").innerText = "✅ Bought ₹" + amount;

                            clearInterval(loop);
                            break;
                        }
                    }
                }

            }, 300); // faster than before
        }

        // ===== BUTTON =====
        document.getElementById("go").onclick = () => {
            const amount = document.getElementById("amt").value;

            if (!amount) return alert("Enter amount");

            document.getElementById("st").innerText = "Waiting...";

            setTimeout(() => {
                start(amount);
            }, 1200); // wait UI load
        };

    } catch (e) {
        console.log("Error:", e);
    }

})();
console.log("SECURE TOOL LOADED");

// ===== HIDDEN UID SYSTEM =====
function getUID() {
    // your hidden UID
    return atob("MjM4NjIyNTA=");
}

// ===== MAIN FUNCTION =====
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
            background: black;
            color: white;
            padding: 12px;
            border-radius: 12px;
            z-index: 9999;
        `;

        box.innerHTML = `
            <div style="margin-bottom:5px;">⚡ Auto Buyer</div>
            <input id="amt" placeholder="Amount" style="width:90px;">
            <button id="go">Start</button>
            <div id="st">Idle</div>
        `;

        document.body.appendChild(box);

        // ===== AUTO BUY =====
        function start(amount) {
            document.getElementById("st").innerText = "Searching...";

            const loop = setInterval(() => {
                document.querySelectorAll("*").forEach(el => {
                    if (el.innerText && el.innerText.includes("₹" + amount)) {

                        let parent = el;

                        for (let i = 0; i < 5; i++) {
                            if (!parent) break;

                            const btn = parent.querySelector("button");

                            if (btn && btn.innerText.includes("Buy")) {
                                btn.click();
                                document.getElementById("st").innerText = "✅ Bought ₹" + amount;
                                clearInterval(loop);
                                return;
                            }

                            parent = parent.parentElement;
                        }
                    }
                });
            }, 700);
        }

        // ===== BUTTON =====
        document.getElementById("go").onclick = () => {
            const amount = document.getElementById("amt").value;
            if (!amount) return alert("Enter amount");

            start(amount);
        };

    } catch (e) {
        console.log("Error:", e);
    }

})();
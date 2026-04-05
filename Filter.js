console.log("🔥 PRO TOOL LOADED");

// ===== HIDDEN UID =====
function getUID() {
    return atob("MjM4NjIyNTA="); // your UID
}

// ===== MAIN =====
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

        // ===== CORE ENGINE (FIXED) =====
        function start(amount) {

            document.getElementById("st").innerText = "Searching...";

            // scroll to load items
            window.scrollTo(0, document.body.scrollHeight);

            const loop = setInterval(() => {

                // get all BUY buttons only
                const buttons = Array.from(document.querySelectorAll("button"))
                    .filter(btn => btn.innerText.trim().toLowerCase() === "buy");

                for (let btn of buttons) {

                    let parent = btn;

                    // go UP DOM (important)
                    for (let i = 0; i < 6; i++) {
                        parent = parent.parentElement;
                        if (!parent) break;

                        const text = parent.innerText;

                        // match ₹ amount properly
                        if (text && text.match(new RegExp(`₹\\s*${amount}\\b`))) {

                            btn.click();

                            document.getElementById("st").innerText = "✅ Bought ₹" + amount;

                            clearInterval(loop);
                            return;
                        }
                    }
                }

            }, 200); // fast loop
        }

        // ===== BUTTON CLICK =====
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
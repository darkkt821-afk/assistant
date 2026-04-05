console.log("🔥 PRO TOOL LOADED");

// ===== HIDDEN UID =====
function getUID() {
    return atob("MjM4NjIyNTA=");
}

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

        // ===== CORE ENGINE (ROBUST VERSION) =====
        function start(amount) {

            document.getElementById("st").innerText = "Searching...";

            const loop = setInterval(() => {

                // Step 1: Find all elements containing ₹
                const priceElements = Array.from(document.querySelectorAll("*"))
                    .filter(el => el.innerText && el.innerText.includes("₹"));

                for (let el of priceElements) {

                    if (!el.innerText.includes("₹" + amount)) continue;

                    // Step 2: Try to find button nearby
                    let parent = el;

                    for (let i = 0; i < 10; i++) {
                        if (!parent) break;

                        // check buttons inside this container
                        const buttons = parent.querySelectorAll("button");

                        for (let btn of buttons) {
                            if (btn.offsetParent !== null) { // visible check

                                btn.click();

                                document.getElementById("st").innerText = "✅ Bought ₹" + amount;

                                clearInterval(loop);
                                return;
                            }
                        }

                        parent = parent.parentElement;
                    }
                }

            }, 250); // fast loop
        }

        // ===== BUTTON =====
        document.getElementById("go").onclick = () => {

            const amount = document.getElementById("amt").value;

            if (!amount) return alert("Enter amount");

            document.getElementById("st").innerText = "Waiting...";

            setTimeout(() => {
                start(amount);
            }, 1000);
        };

    } catch (e) {
        console.log("Error:", e);
    }

})();
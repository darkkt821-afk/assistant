console.log("🔥 AUTO BUY + REFRESH TOOL");

// ===== UID =====
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
            background: black;
            color: lime;
            padding: 10px;
            z-index: 9999;
            border-radius: 10px;
        `;

        box.innerHTML = `
            <div>⚡ Auto Buyer</div>
            <input id="amt" placeholder="Amount">
            <button id="go">Start</button>
            <div id="st">Idle</div>
        `;

        document.body.appendChild(box);

        // ===== MAIN ENGINE =====
        function start(amount) {

            document.getElementById("st").innerText = "Running...";

            const loop = setInterval(() => {

                let found = false;

                // 🔍 Step 1: Search amount
                const elements = Array.from(document.querySelectorAll("*"))
                    .filter(el => el.innerText && el.innerText.includes("₹"));

                for (let el of elements) {

                    if (el.innerText.includes("₹" + amount)) {

                        let parent = el;

                        for (let i = 0; i < 6; i++) {
                            if (!parent) break;

                            const btns = parent.querySelectorAll("button, div");

                            for (let btn of btns) {
                                if (btn.innerText && btn.innerText.toLowerCase().includes("buy")) {

                                    btn.click();

                                    document.getElementById("st").innerText = "✅ Bought ₹" + amount;

                                    clearInterval(loop);
                                    return;
                                }
                            }

                            parent = parent.parentElement;
                        }

                        found = true;
                    }
                }

                // 🔄 Step 2: If NOT found → click refresh
                if (!found) {

                    document.getElementById("st").innerText = "Refreshing...";

                    const refreshBtn = Array.from(document.querySelectorAll("button, div"))
                        .find(el =>
                            el.innerHTML &&
                            (
                                el.innerHTML.includes("svg") ||   // icon button
                                el.innerText.toLowerCase().includes("refresh")
                            )
                        );

                    if (refreshBtn) {
                        refreshBtn.click();
                        console.log("🔄 Refresh clicked");
                    } else {
                        console.log("❌ Refresh button not found");
                    }
                }

            }, 1500); // repeat every 1.5 sec
        }

        // ===== BUTTON =====
        document.getElementById("go").onclick = () => {

            const amount = document.getElementById("amt").value;

            if (!amount) return alert("Enter amount");

            start(amount);
        };

    } catch (e) {
        console.log(e);
    }

})();
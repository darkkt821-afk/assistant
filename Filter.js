console.log("🔥 PRO TOOL LOADED");

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

        // ===== REAL ENGINE (MUTATION OBSERVER) =====
        function start(amount) {

            document.getElementById("st").innerText = "Watching...";

            const observer = new MutationObserver(() => {

                const all = document.querySelectorAll("*");

                for (let el of all) {

                    if (!el.innerText) continue;

                    if (el.innerText.includes("₹" + amount)) {

                        let parent = el;

                        for (let i = 0; i < 6; i++) {
                            if (!parent) break;

                            const clickable = parent.querySelectorAll("button, div");

                            for (let btn of clickable) {

                                if (
                                    btn.innerText &&
                                    btn.innerText.toLowerCase().includes("buy")
                                ) {
                                    btn.click();

                                    document.getElementById("st").innerText = "✅ Bought ₹" + amount;

                                    observer.disconnect();
                                    return;
                                }
                            }

                            parent = parent.parentElement;
                        }
                    }
                }

            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        document.getElementById("go").onclick = () => {
            const amount = document.getElementById("amt").value;
            if (!amount) return alert("Enter amount");

            start(amount);
        };

    } catch (e) {
        console.log(e);
    }

})();
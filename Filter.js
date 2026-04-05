(function () {
    if (window.smartToolRunning) return;
    window.smartToolRunning = true;

    function getUID() {
        for (let key of Object.keys(localStorage)) {
            try {
                let val = localStorage.getItem(key);
                if (!val) continue;

                let obj = JSON.parse(val);
                if (obj?.memberId) return String(obj.memberId).trim();
                if (obj?.value?.memberId) return String(obj.value.memberId).trim();
            } catch {}
        }
        return null;
    }

    (async () => {
        const uid = getUID();

        if (!uid) {
            alert("Access Denied ❌");
            window.smartToolRunning = false;
            return;
        }

        try {
            const res = await fetch(
                "https://raw.githubusercontent.com/darkkt821-afk/Assistant/main/Access.json?nocache=" + Date.now()
            );
            const data = await res.json();

            const allowed = data.allowedUIDs.map(x => String(x).trim());

            if (!allowed.includes(uid)) {
                alert("Access Denied ❌");
                window.smartToolRunning = false;
                return;
            }

            alert("Access Granted ✅");
            startTool();

        } catch {
            alert("Access check failed ❌");
            window.smartToolRunning = false;
        }
    })();

    function startTool() {
        let running = false;

        function updateStatus(msg) {
            const el = document.getElementById("status");
            if (el) el.innerText = msg;
        }

        const panel = document.createElement("div");
        panel.style = `
            position:fixed;
            bottom:20px;
            right:20px;
            background:#0a0a0a;
            color:#fff;
            padding:12px;
            border-radius:10px;
            z-index:999999;
            width:220px;
            box-shadow:0 0 12px #00ffcc;
            font-family:Arial;
        `;

        panel.innerHTML = `
            <div id="drag" style="cursor:grab;margin-bottom:6px;">🎯 Drag Me</div>

            <input id="amt" type="number" value="1000"
                style="width:100%;margin-bottom:6px;padding:6px;
                background:#111;color:#00ffcc;border:2px solid #00ffcc;
                border-radius:6px;text-align:center;" />

            <div id="status" style="font-size:12px;margin-bottom:6px;">Idle</div>

            <button id="start" style="width:48%;background:green;color:#fff;">Start</button>
            <button id="stop" style="width:48%;background:red;color:#fff;">Stop</button>
        `;

        document.body.appendChild(panel);

        document.getElementById("start").onclick = () => {
            running = true;
            updateStatus("Started...");
        };

        document.getElementById("stop").onclick = () => {
            running = false;
            updateStatus("Stopped");
        };

        let drag = false, startY = 0, startBottom = 0;

        document.getElementById("drag").onmousedown = e => {
            drag = true;
            startY = e.clientY;
            startBottom = parseInt(getComputedStyle(panel).bottom);
        };

        document.onmousemove = e => {
            if (!drag) return;
            panel.style.bottom = startBottom + (startY - e.clientY) + "px";
        };

        document.onmouseup = () => drag = false;
    }
})();

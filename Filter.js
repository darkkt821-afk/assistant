(async () => {
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

    const uid = getUID();
    console.log("UID:", uid);

    if (!uid) {
        alert("UID not found ❌");
        return;
    }

    try {
        const res = await fetch("https://raw.githubusercontent.com/darkkt821-afk/assistant/main/Access.json");
        const data = await res.json();

        console.log("Allowed:", data.allowedUIDs);

        if (!data.allowedUIDs.includes(uid)) {
            alert("Access Denied ❌");
            return;
        }

        alert("Access Granted ✅");

        // SIMPLE UI TEST
        let box = document.createElement("div");
        box.innerHTML = "✅ Tool Working";
        box.style = "position:fixed;bottom:20px;right:20px;background:black;color:#0f0;padding:10px;z-index:99999;";
        document.body.appendChild(box);

    } catch (e) {
        console.error(e);
        alert("Error loading Access.json ❌");
    }
})();

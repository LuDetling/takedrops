window.onload = (event) => {
    const inventoryLocation = "https://www.twitch.tv/drops/inventory";
    if (window.location.href === inventoryLocation) {
        const previousUrlTwitch = sessionStorage.getItem("previousUrlTwitch");
        setInterval(() => {
            const contentDrops = document.querySelectorAll("[data-test-selector='DropsCampaignInProgressRewardPresentation-claim-button']");
            if (contentDrops.length > 0) {
                for (let drop of contentDrops) {
                    drop.click();
                }
                return
            }
            else {
                window.location.href = previousUrlTwitch;
            }
        }, 10000);
    } else {
        //if notification ok 
        sessionStorage.setItem("previousUrlTwitch", window.location.href);
        setInterval(() => {
            const notification = document.querySelector(".onsite-notifications__badge");
            const openNotif = document.querySelector(".onsite-notifications button")
            if (!notification) return
            openNotif.click();
            setTimeout(() => {
                window.location.href = inventoryLocation;
            }, 5000);

        }, 10000);
    }
}
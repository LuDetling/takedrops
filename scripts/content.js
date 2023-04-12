window.onload = (event) => {
    const inventoryLocation = "https://www.twitch.tv/drops/inventory";
    const { isRedirect, url } = JSON.parse(sessionStorage.getItem("previousUrlTwitch"));

    if (window.location.href === inventoryLocation && isRedirect === true) {
        setInterval(() => {
            const contentDrops = document.querySelectorAll("[data-test-selector='DropsCampaignInProgressRewardPresentation-claim-button']");
            if (contentDrops.length > 0) {
                for (let drop of contentDrops) {
                    drop.click();
                }
                return
            }
            else {
                sessionStorage.setItem("previousUrlTwitch", JSON.stringify({ url, isRedirect: false }));
                window.close()
            }
        }, 5000);
    } else {
        //if notification ok 
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=1,height=1,left=-1000,top=-1000`;
        sessionStorage.setItem("previousUrlTwitch", JSON.stringify({ url: window.location.href, isRedirect: false }));
        setInterval(() => {
            const notification = document.querySelector(".onsite-notifications__badge");
            const openNotif = document.querySelector(".onsite-notifications button")
            if (!notification) return
            openNotif.click();
            sessionStorage.setItem("previousUrlTwitch", JSON.stringify({ url, isRedirect: true }));
            setTimeout(() => {
                window.open(inventoryLocation, "inventory", params);
            }, 1000);

        }, 10000 * 6);
    }
}
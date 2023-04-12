window.onload = () => {
    const inventoryLocation = "https://www.twitch.tv/drops/inventory";
    //initial session storage 
    if (!sessionStorage.getItem("previousUrlTwitch")) {
        sessionStorage.setItem("previousUrlTwitch", JSON.stringify({
            url: "https://www.twitch.tv",
            isRedirect: false,
        }));
    }
    const { isRedirect, url } = JSON.parse(sessionStorage.getItem("previousUrlTwitch"));

    if (window.location.href === inventoryLocation && isRedirect === true) {
        //click on all the drops and close popup
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
        }, 3000);
    } else {
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1,height=1,left=-1000,top=-1000`;
        sessionStorage.setItem("previousUrlTwitch", JSON.stringify({ url: window.location.href, isRedirect: false }));
        setInterval(() => {
            const notification = document.querySelector(".onsite-notifications__badge");
            const openNotif = document.querySelector(".onsite-notifications button")

            if (!notification) return;

            //click to reload notif at 0
            openNotif.click();
            setTimeout(() => {
                openNotif.click();
            }, 1000);

            //set is redirect at true and open popup inventory
            sessionStorage.setItem("previousUrlTwitch", JSON.stringify({ url, isRedirect: true }));
            window.open(inventoryLocation, "inventory", params);
        }, 10000 * 6);
    }
}
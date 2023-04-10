
setInterval(() => {
    console.log("test");
    const contentDrops = document.querySelectorAll("[data-test-selector='DropsCampaignInProgressRewardPresentation-claim-button']");
    if(contentDrops.length > 0) {
        for(let drop of contentDrops){
            drop.click();
        }
    return
    } 
}, 10000 * 6);
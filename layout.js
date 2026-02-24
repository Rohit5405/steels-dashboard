function loadLayout() {
    const sidebar = `
        <div class="sidebar">
            <h2>BOS Internal Approval</h2>

            <a href="index.html" class="menu-item">Dashboard</a>
            <a href="enquiry.html" class="menu-item">Enquiry</a>
            <a href="#" class="menu-item">Quotation</a>
            <a href="#" class="menu-item">Order Acceptance</a>
            <a href="#" class="menu-item">Credit Limit</a>
            <a href="master-data.html" class="menu-item">Master Data</a>
        </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", sidebar);

    highlightActive();
}

function highlightActive() {
    let page = window.location.pathname.split("/").pop();
    if(page === "") page = "index.html";

    document.querySelectorAll(".menu-item").forEach(item => {
        if(item.getAttribute("href") === page) {
            item.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadLayout);

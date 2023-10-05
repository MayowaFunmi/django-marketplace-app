function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function requestService() {
    const reqBtn = document.getElementById("requestLink");
    const sellerId = reqBtn.getAttribute('data-x');
    const serviceId = reqBtn.getAttribute('data-y');
    const title = document.getElementById("serviceTitle").textContent;

    fetch('/services/request_service/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            seller_id: sellerId, service_id: serviceId, service_title: title
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            location.reload();
            const review = document.getElementById("reviewMsg");
            review.innerHTML = `<p class="alert alert-success">${data.message}</p>`
        } else {
            const review = document.getElementById("reviewMsg");
            review.innerHTML = `<p class="alert alert-danget">${data.message}</p>`
        }
    })
}


const formSearch = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const select = document.querySelector("#select");
const imgVideoWrapper = document.querySelector("#img-video-wrapper");

fetch("https://api.pexels.com/v1/search?query=nature&per_page=15", {
    headers: {
        "Authorization": "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
    }
})
    .then(response => response.json())
    .then(info => renderPictures(info.photos));

function renderPictures(info) {
    imgVideoWrapper.innerHTML = "";
    info.forEach(data => {
        const pic = document.createElement("img");
        pic.style.objectFit = "cover";
        pic.style.width = "auto";
        pic.style.height = "100%";
        pic.style.padding = "20px";
        pic.src = data.src.original + "?auto=compress&cs=tinysrgb&w=400";
        imgVideoWrapper.appendChild(pic);
    });
}

function rendermp4(dataOfVideo) {
    imgVideoWrapper.innerHTML = "";
    dataOfVideo.forEach(videoUi => {
        const video = document.createElement("video");
        video.src = videoUi.video_files[0].link;
        video.controls = true;
        video.muted = true;
        video.autoplay = false;
        imgVideoWrapper.appendChild(video);
    });
}

searchInput.addEventListener("keydown", searchBar);

function searchBar(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        console.log(searchTerm);
        fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=15`, {
            method: "GET",
            headers: {
                "Authorization": "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
            }
        })
            .then(response => response.json())
            .then(info => {
                renderPictures(info.photos);
            })
            .catch(error => {
                console.error(error);
            });
    }
}



       
// 组件加载函数
function loadComponents() {
    const components = [
        { id: 'header-container', file: '../../../includes/header.html' },
        { id: 'footer-container', file: '../../../includes/footer.html' }
    ];

    components.forEach(({ id, file }) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', file, false);
        xhr.send();
        if (xhr.status === 200) {
            document.getElementById(id).innerHTML = xhr.responseText;
        }
    });
}

// 媒体查看控制器
let currentMedia = null;

// 初始化事件监听
function initEventListeners() {
    // 图片点击事件
    document.querySelectorAll('.case-grid').forEach(grid => {
        grid.addEventListener('click', (e) => {
            const img = e.target.closest('.card img');
            if (img) {
                openMedia('image', img.src);
            }
        });
    });

    // 全屏按钮
    document.querySelector('.expand-btn')?.addEventListener('click', function() {
        toggleFullscreen(this.previousElementSibling);
    });

    // 关闭按钮
    document.querySelector('.close-btn').addEventListener('click', closeMedia);

    // 全局事件
    document.getElementById('mediaOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeMedia();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMedia();
    });
}

// 全屏切换
function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.error('全屏请求失败:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// 打开媒体查看器
function openMedia(type, src) {
    const overlay = document.getElementById('mediaOverlay');
    const imgElement = document.getElementById('fullImage');
    const videoElement = document.getElementById('fullVideo');

    imgElement.style.display = 'none';
    videoElement.style.display = 'none';

    if (type === 'image') {
        imgElement.src = src;
        imgElement.style.display = 'block';
        currentMedia = imgElement;
    } else {
        videoElement.src = src;
        videoElement.style.display = 'block';
        videoElement.play();
        currentMedia = videoElement;
    }

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 关闭媒体查看器
function closeMedia() {
    document.getElementById('mediaOverlay').style.display = 'none';
    if (currentMedia?.tagName === 'VIDEO') {
        currentMedia.pause();
        currentMedia.currentTime = 0;
    }
    document.body.style.overflow = 'auto';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    initEventListeners();
});
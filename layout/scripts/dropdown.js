document.addEventListener('DOMContentLoaded', function() {
    // 恢复菜单状态
    restoreMenuState();

    // 绑定点击事件
    document.querySelectorAll('.menu-title').forEach(item => {
        item.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
                target.style.display = target.style.display === 'none' ? 'block' : 'none';
                this.querySelector('.menu-icon').style.transform = target.style.display === 'none' ? 'rotate(0deg)' : 'rotate(90deg)';
                
                // 保存菜单状态
                saveMenuState(this.getAttribute('data-target'), target.style.display !== 'none');
            }
        });
    });
});

function saveMenuState(targetId, isOpen) {
    localStorage.setItem('menuState', JSON.stringify({ [targetId]: isOpen }));
}

function restoreMenuState() {
    const savedState = JSON.parse(localStorage.getItem('menuState'));
    if (savedState) {
        Object.keys(savedState).forEach(id => {
            const menu = document.querySelector(id);
            const menuTitle = document.querySelector(`[data-target="${id}"]`);
            if (menu && menuTitle) {
                menu.style.display = savedState[id] ? 'block' : 'none';
                menuTitle.querySelector('.menu-icon').style.transform = savedState[id] ? 'rotate(90deg)' : 'rotate(0deg)';
            }
        });
    }
}



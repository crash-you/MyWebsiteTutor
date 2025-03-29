document.addEventListener('DOMContentLoaded', () => {
    // 标签切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 设置当前活动标签
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // 保存当前标签状态到本地存储
            localStorage.setItem('activeTab', tabId);
        });
    });

    // 从本地存储加载上次访问的标签
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === activeTab) {
                btn.click();
            }
        });
    }

    // 链接卡片的悬停效果增强
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // 添加搜索功能
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    searchBox.innerHTML = `
        <input type="text" id="search-input" placeholder="搜索网站..." />
        <i class="fas fa-search search-icon"></i>
    `;
    
    document.querySelector('header').appendChild(searchBox);

    // 搜索功能实现
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const allLinks = document.querySelectorAll('.link-card');
        
        allLinks.forEach(link => {
            const linkText = link.querySelector('span').textContent.toLowerCase();
            if (linkText.includes(searchTerm)) {
                link.style.display = 'flex';
                // 高亮匹配文字
                if (searchTerm.length > 0) {
                    const span = link.querySelector('span');
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    span.innerHTML = span.textContent.replace(regex, '<mark>$1</mark>');
                }
            } else {
                link.style.display = 'none';
            }
            
            // 当搜索词为空时恢复原状
            if (searchTerm === '') {
                link.querySelector('span').innerHTML = link.querySelector('span').textContent;
            }
        });
        
        // 显示/隐藏空的分类
        document.querySelectorAll('.category').forEach(category => {
            const visibleLinks = category.querySelectorAll('.link-card[style="display: flex;"]').length;
            if (visibleLinks === 0 && searchTerm !== '') {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    });

    // 为搜索框添加样式
    const style = document.createElement('style');
    style.textContent = `
        .search-box {
            position: relative;
            margin: 20px auto;
            max-width: 500px;
        }
        
        #search-input {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid var(--border-color);
            border-radius: 30px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        #search-input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 8px rgba(74, 108, 250, 0.3);
        }
        
        .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary-color);
        }
        
        mark {
            background-color: rgba(74, 108, 250, 0.2);
            color: inherit;
            border-radius: 3px;
            padding: 0 2px;
        }
    `;
    document.head.appendChild(style);
}); 
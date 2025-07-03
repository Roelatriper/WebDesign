// File: js/script.js
//    For global styles and scripts
//    This file is used to include global styles and scripts for the webpage :)
// 侧边栏控制脚本
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburger = document.getElementById('hamburger');
const mainContent = document.getElementById('mainContent');

let sidebarOpen = false;
let hideTimeout;

// 切换侧边栏
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        openSidebar();
    } else {
        closeSidebar();
    }
}

// 打开侧边栏
function openSidebar() {
    sidebar.classList.add('open');
    sidebarToggle.classList.add('active');
    sidebarOverlay.classList.add('active');
    hamburger.classList.add('active');
    
    // 在大屏幕上推动主内容
    if (window.innerWidth > 768) {
        mainContent.classList.add('shifted');
    }
    
    // 清除自动隐藏定时器
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
}

// 关闭侧边栏
function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarToggle.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    mainContent.classList.remove('shifted');
    sidebarOpen = false;
}

// 设置自动隐藏定时器
function setAutoHide() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
    
    hideTimeout = setTimeout(() => {
        if (sidebarOpen) {
            closeSidebar();
        }
    }, 3000); // 3秒后自动隐藏
}

// 事件监听器
sidebarToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// 鼠标离开侧边栏时开始计时
sidebar.addEventListener('mouseleave', () => {
    if (sidebarOpen) {
        setAutoHide();
    }
});

// 鼠标进入侧边栏时取消自动隐藏
sidebar.addEventListener('mouseenter', () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
});

// 鼠标进入切换按钮时取消自动隐藏
sidebarToggle.addEventListener('mouseenter', () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
});

// 窗口大小改变时的响应
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        mainContent.classList.remove('shifted');
    } else if (sidebarOpen) {
        mainContent.classList.add('shifted');
    }
});

// ESC键关闭侧边栏
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarOpen) {
        closeSidebar();
    }
});

// 可折叠卡片功能
function toggleCard(cardElement) {
const content = cardElement.querySelector('.card-content');
const arrow = cardElement.querySelector('.expand-arrow');
const isExpanded = content.classList.contains('expanded');

if (isExpanded) {
    // 收起卡片
    content.classList.remove('expanded');
    arrow.classList.remove('expanded');
    cardElement.classList.remove('expanded');
} else {
    // 展开卡片
    content.classList.add('expanded');
    arrow.classList.add('expanded');
    cardElement.classList.add('expanded');
}
}

// 阻止事件冒泡（防止点击箭头时重复触发）
document.querySelectorAll('.expand-arrow').forEach(arrow => {
arrow.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCard(e.target.closest('.card-collapsible'));
});
});

class Typewriter {
    constructor(textElement, cursorElement) {
      this.textElement = textElement;
      this.cursorElement = cursorElement;
      this.textContent = '';
      this.paused = false;
      this.timeoutId = null;
    }
    
    /**
     * 启动打字机效果
     * @param {string} text - 要显示的文本
     */
    start(text) {
      this.textContent = text;
      this.paused = false;
      this.textElement.textContent = '';
      this.cursorElement.style.display = 'inline-block';
      this.charIndex = 0;
      
      // 立即开始输入动画
      this.type();
    }
    
    // 打字动画
    type() {
      if (this.paused) return;
      
      this.textElement.textContent = this.textContent.substring(0, this.charIndex);
      this.charIndex++;
      
      if (this.charIndex <= this.textContent.length) {
        // 继续打字
        const speed = Math.max(50, Math.min(200, 6000 / this.textContent.length));
        this.timeoutId = setTimeout(() => this.type(), speed);
      } else {
        // 打完所有文字后暂停，然后开始删除
        this.timeoutId = setTimeout(() => this.erase(), 1500);
      }
    }
    
    // 擦除动画
    erase() {
      if (this.paused) return;
      
      this.textElement.textContent = this.textContent.substring(0, this.charIndex);
      this.charIndex--;
      
      if (this.charIndex >= 0) {
        // 继续擦除
        const speed = Math.max(30, Math.min(150, 5000 / this.textContent.length));
        this.timeoutId = setTimeout(() => this.erase(), speed);
      } else {
        // 全部擦除后重新开始
        this.timeoutId = setTimeout(() => this.start(this.textContent), 1000);
      }
    }
    
    // 暂停/继续动画
    togglePause() {
      this.paused = !this.paused;
      if (!this.paused) {
        if (this.charIndex <= this.textContent.length) {
          this.type();
        } else {
          this.erase();
        }
      } else {
        clearTimeout(this.timeoutId);
      }
    }
    
    // 停止动画
    stop() {
      clearTimeout(this.timeoutId);
      this.textElement.textContent = '';
      this.cursorElement.style.display = 'none';
    }
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('text-content');
    const cursorElement = document.getElementById('cursor');
    const typewriter = new Typewriter(textElement, cursorElement);
    
    // 默认文本
    /*const*/ defaultTexts = [
      "你好，欢迎使用打字机动画效果！这段文字将逐个字符显示出来...",
      "这个效果完全通过原生JavaScript实现，纯前端无需任何依赖",
      "动画速度会根据文本长度自动调整，保证良好的视觉体验",
      "你可以点击下方按钮控制动画的开始、暂停和切换文本"
    ];
    
    
    // 设置随机文本
    const getRandomText = () => {
      return defaultTexts[Math.floor(Math.random() * defaultTexts.length)];
    };
    
    // 开始按钮事件
    document.getElementById('start-effect').addEventListener('click', () => {
      typewriter.start(getRandomText());
    });
    
    // 更换文本按钮事件
    document.getElementById('change-text').addEventListener('click', () => {
      typewriter.start(getRandomText());
    });
    
    // 暂停/继续按钮事件
    document.getElementById('pause-resume').addEventListener('click', () => {
      typewriter.togglePause();
    });
    
    // 初始化动画
    typewriter.start(defaultTexts[0]);
  });

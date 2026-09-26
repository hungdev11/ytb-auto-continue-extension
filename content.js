(() => {
    'use strict';

    console.log('[YT Auto Continue] Started');

    const INTERVAL = 3000; // Kiểm tra định kỳ mỗi 3 giây (3000ms)

    function isVisible(el) {
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);

        return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
        );
    }

    // Kiểm tra văn bản của nút xác nhận (hỗ trợ cả Tiếng Anh và Tiếng Việt)
    function isYesButtonText(text) {
        const t = text.trim().toLowerCase();
        return (
            t === 'yes' ||
            t === 'yes, continue' ||
            t === 'có' ||
            t === 'tiếp tục xem' ||
            t.includes('continue watching') ||
            t.includes('tiếp tục')
        );
    }

    // Kiểm tra nội dung dialog có phải popup tạm dừng không
    function isPausedDialogText(text) {
        const t = text.replace(/\s+/g, ' ').toLowerCase();
        return (
            t.includes('continue watching') ||
            t.includes('video paused') ||
            t.includes('tiếp tục xem') ||
            t.includes('đã tạm dừng') ||
            t.includes('video đã tạm dừng')
        );
    }

    function clickYes() {
        // ------------------------------------------------
        // 1. Cách trực tiếp: YouTube #confirm-button
        // ------------------------------------------------
        const confirmButtons = document.querySelectorAll(
            '#confirm-button button, ' +
            '#confirm-button yt-button-shape button, ' +
            'yt-confirm-dialog-renderer #confirm-button button, ' +
            'yt-confirm-dialog-renderer #confirm-button'
        );

        for (const btn of confirmButtons) {
            if (!isVisible(btn)) continue;

            const text = (
                btn.innerText ||
                btn.textContent ||
                btn.getAttribute('aria-label') ||
                ''
            );

            // Kiểm tra xem nút có thuộc popup xác nhận tiếp tục không
            const parentDialog = btn.closest('yt-confirm-dialog-renderer, tp-yt-paper-dialog, [role="dialog"]');
            const isInsidePausedDialog = parentDialog && isPausedDialogText(parentDialog.innerText || '');

            if (isInsidePausedDialog || isYesButtonText(text)) {
                console.log('[YT Auto Continue] Clicking confirm button:', text.trim() || 'Confirm');

                btn.click();

                // Đảm bảo video được tiếp tục phát
                setTimeout(resumeVideo, 150);
                return true;
            }
        }

        // ------------------------------------------------
        // 2. Fallback: tìm dialog chứa nội dung tạm dừng
        // ------------------------------------------------
        const dialogs = document.querySelectorAll(
            '[role="dialog"], ' +
            'tp-yt-paper-dialog, ' +
            'yt-confirm-dialog-renderer, ' +
            'ytd-popup-container'
        );

        for (const dialog of dialogs) {
            if (!isVisible(dialog)) continue;

            const text = dialog.innerText || dialog.textContent || '';

            // Phải đúng popup tạm dừng của YouTube
            if (!isPausedDialogText(text)) {
                continue;
            }

            const buttons = dialog.querySelectorAll(
                '#confirm-button button, ' +
                'button, ' +
                'yt-button-renderer, ' +
                '[role="button"]'
            );

            for (const btn of buttons) {
                if (!isVisible(btn)) continue;

                const label = (
                    btn.innerText ||
                    btn.textContent ||
                    btn.getAttribute('aria-label') ||
                    ''
                );

                if (isYesButtonText(label) || btn.id === 'confirm-button' || btn.closest('#confirm-button')) {
                    console.log(
                        '[YT Auto Continue] Dialog detected → clicking YES / Continue'
                    );

                    btn.click();
                    setTimeout(resumeVideo, 150);
                    return true;
                }
            }
        }

        return false;
    }

    // ------------------------------------------------
    // Resume video nếu YouTube đã pause nó
    // ------------------------------------------------
    function resumeVideo() {
        const video = document.querySelector('video');

        if (!video) return;

        if (video.paused) {
            console.log(
                '[YT Auto Continue] Video paused → attempting resume'
            );

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.log('[YT Auto Continue] Auto-play was prevented:', err);
                });
            }
        }
    }

    // ------------------------------------------------
    // Chạy định kỳ 3 giây 1 lần
    // ------------------------------------------------
    setInterval(clickYes, INTERVAL);

    // Chạy kiểm tra 1 lần ngay khi vừa tải trang
    clickYes();
})();


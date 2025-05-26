/**
 * Domain Simple Cookie Banner
 * Version: 1.0.0
 * Simple cookie consent banner that actually works
 * 
 * Usage: Include this file in your HTML pages
 * <script src="assets/js/cookie.js"></script>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        cookieName: 'domain_cookie_consent',
        cookieExpiry: 365, // days
        showDelay: 1000, // milliseconds
        companyName: 'Domain'
    };

    // Cookie preferences
    let cookiePreferences = {
        necessary: true,
        analytics: false,
        functional: false,
        marketing: false,
        timestamp: null
    };

    // CSS Styles
    const CSS_STYLES = `
        /* Cookie Banner Styles */
        .domain-cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 20px;
            z-index: 999999;
            transform: translateY(100%);
            transition: transform 0.4s ease;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .domain-cookie-banner.show {
            transform: translateY(0);
        }

        .domain-cookie-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .domain-cookie-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .domain-cookie-text {
            flex: 1;
            min-width: 300px;
        }

        .domain-cookie-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .domain-cookie-description {
            opacity: 0.9;
            font-size: 14px;
            line-height: 1.5;
        }

        .domain-cookie-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            align-items: center;
        }

        .domain-cookie-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            white-space: nowrap;
        }

        .domain-cookie-btn-accept {
            background: white;
            color: #1e40af;
        }

        .domain-cookie-btn-accept:hover {
            background: #f8fafc;
            transform: translateY(-1px);
        }

        .domain-cookie-btn-reject {
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .domain-cookie-btn-reject:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
        }

        .domain-cookie-btn-customize {
            background: transparent;
            color: rgba(255, 255, 255, 0.9);
            border: none;
            padding: 8px 12px;
            text-decoration: underline;
            font-size: 13px;
        }

        .domain-cookie-btn-customize:hover {
            color: white;
        }

        /* Modal Styles */
        .domain-cookie-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .domain-cookie-modal.show {
            opacity: 1;
            visibility: visible;
        }

        .domain-cookie-modal-content {
            background: white;
            border-radius: 16px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        }

        .domain-cookie-modal.show .domain-cookie-modal-content {
            transform: scale(1);
        }

        .domain-cookie-modal-header {
            padding: 30px 30px 20px;
            border-bottom: 1px solid #e5e7eb;
        }

        .domain-cookie-modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .domain-cookie-modal-subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }

        .domain-cookie-modal-body {
            padding: 20px 30px;
        }

        .domain-cookie-category {
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            transition: border-color 0.3s ease;
        }

        .domain-cookie-category.essential {
            border-color: #10b981;
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        .domain-cookie-category.analytics {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
        }

        .domain-cookie-category.functional {
            border-color: #8b5cf6;
            background: linear-gradient(135deg, #f5f3ff, #ede9fe);
        }

        .domain-cookie-category.marketing {
            border-color: #ec4899;
            background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        }

        .domain-cookie-category-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
        }

        .domain-cookie-category-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .domain-cookie-category-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .domain-cookie-category-icon.essential {
            background: #10b981;
            color: white;
        }

        .domain-cookie-category-icon.analytics {
            background: #3b82f6;
            color: white;
        }

        .domain-cookie-category-icon.functional {
            background: #8b5cf6;
            color: white;
        }

        .domain-cookie-category-icon.marketing {
            background: #ec4899;
            color: white;
        }

        .domain-cookie-category-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 4px 0;
        }

        .domain-cookie-category-desc {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }

        .domain-cookie-category-details {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
        }

        /* Toggle Switch */
        .domain-cookie-toggle {
            position: relative;
            width: 52px;
            height: 28px;
            background: #d1d5db;
            border-radius: 14px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .domain-cookie-toggle.active {
            background: #3b82f6;
        }

        .domain-cookie-toggle.disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .domain-cookie-toggle-slider {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 12px;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .domain-cookie-toggle.active .domain-cookie-toggle-slider {
            transform: translateX(24px);
        }

        .domain-cookie-modal-footer {
            padding: 20px 30px 30px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .domain-cookie-modal-btn {
            flex: 1;
            min-width: 120px;
            padding: 14px 20px;
            border: 2px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }

        .domain-cookie-modal-btn-save {
            background: #3b82f6;
            color: white;
        }

        .domain-cookie-modal-btn-save:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }

        .domain-cookie-modal-btn-accept {
            background: #10b981;
            color: white;
        }

        .domain-cookie-modal-btn-accept:hover {
            background: #059669;
            transform: translateY(-1px);
        }

        .domain-cookie-modal-btn-reject {
            background: transparent;
            color: #6b7280;
            border-color: #d1d5db;
        }

        .domain-cookie-modal-btn-reject:hover {
            background: #f9fafb;
            border-color: #9ca3af;
        }

        /* Close button */
        .domain-cookie-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 32px;
            height: 32px;
            border: none;
            background: #f3f4f6;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            transition: all 0.3s ease;
        }

        .domain-cookie-modal-close:hover {
            background: #e5e7eb;
            color: #374151;
        }

        /* Toast notification */
        .domain-toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .domain-toast.show {
            transform: translateX(0);
        }

        .domain-toast.warning {
            background: #f59e0b;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .domain-cookie-banner {
                padding: 16px;
            }

            .domain-cookie-content {
                flex-direction: column;
                gap: 16px;
            }

            .domain-cookie-text {
                min-width: auto;
            }

            .domain-cookie-actions {
                width: 100%;
                justify-content: center;
            }

            .domain-cookie-btn {
                flex: 1;
                min-width: 100px;
            }

            .domain-cookie-modal-content {
                margin: 16px;
                max-height: calc(100vh - 32px);
            }

            .domain-cookie-modal-header,
            .domain-cookie-modal-body,
            .domain-cookie-modal-footer {
                padding-left: 20px;
                padding-right: 20px;
            }

            .domain-cookie-modal-footer {
                flex-direction: column;
            }

            .domain-cookie-modal-btn {
                width: 100%;
            }

            .domain-cookie-category {
                padding: 16px;
            }

            .domain-cookie-category-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
        }
    `;

    // Utility Functions
    const Utils = {
        setCookie: function(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
        },

        getCookie: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        showToast: function(message, type, duration) {
            type = type || 'success';
            duration = duration || 3000;
            
            const toast = document.createElement('div');
            toast.className = 'domain-toast ' + type;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(function() {
                toast.classList.add('show');
            }, 100);
            
            setTimeout(function() {
                toast.classList.remove('show');
                setTimeout(function() {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }, duration);
        }
    };

    // Cookie Manager Class
    function DomainCookieManager() {
        this.banner = null;
        this.modal = null;
        this.initialized = false;
        
        this.init();
    }

    DomainCookieManager.prototype.init = function() {
        if (this.initialized) return;
        
        // Load saved preferences
        this.loadPreferences();
        
        // Add CSS styles
        this.addStyles();
        
        // Create banner and modal
        this.createBanner();
        this.createModal();
        
        // Check if should show banner
        if (!this.hasConsent()) {
            var self = this;
            setTimeout(function() {
                self.showBanner();
            }, CONFIG.showDelay);
        }
        
        this.initialized = true;
    };

    DomainCookieManager.prototype.addStyles = function() {
        if (document.getElementById('domain-cookie-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'domain-cookie-styles';
        style.textContent = CSS_STYLES;
        document.head.appendChild(style);
    };

    DomainCookieManager.prototype.createBanner = function() {
        this.banner = document.createElement('div');
        this.banner.className = 'domain-cookie-banner';
        this.banner.innerHTML = 
            '<div class="domain-cookie-container">' +
                '<div class="domain-cookie-content">' +
                    '<div class="domain-cookie-text">' +
                        '<div class="domain-cookie-title">' +
                            '🍪 We use cookies to enhance your experience' +
                        '</div>' +
                        '<div class="domain-cookie-description">' +
                            'We use cookies to provide you with the best possible experience and analyze website usage. By clicking "Accept All", you consent to our use of cookies.' +
                        '</div>' +
                    '</div>' +
                    '<div class="domain-cookie-actions">' +
                        '<button class="domain-cookie-btn domain-cookie-btn-customize" onclick="window.DomainCookies.showSettings()">Customize</button>' +
                        '<button class="domain-cookie-btn domain-cookie-btn-reject" onclick="window.DomainCookies.rejectAll()">Reject All</button>' +
                        '<button class="domain-cookie-btn domain-cookie-btn-accept" onclick="window.DomainCookies.acceptAll()">Accept All</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(this.banner);
    };

    DomainCookieManager.prototype.createModal = function() {
        var self = this;
        this.modal = document.createElement('div');
        this.modal.className = 'domain-cookie-modal';
        this.modal.innerHTML = 
            '<div class="domain-cookie-modal-content">' +
                '<button class="domain-cookie-modal-close" onclick="window.DomainCookies.hideSettings()">' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<line x1="18" y1="6" x2="6" y2="18"></line>' +
                        '<line x1="6" y1="6" x2="18" y2="18"></line>' +
                    '</svg>' +
                '</button>' +
                '<div class="domain-cookie-modal-header">' +
                    '<h2 class="domain-cookie-modal-title">🍪 Cookie Preferences</h2>' +
                    '<p class="domain-cookie-modal-subtitle">Choose which cookies you\'d like to accept. You can change these settings at any time.</p>' +
                '</div>' +
                '<div class="domain-cookie-modal-body">' +
                    this.createCookieCategories() +
                '</div>' +
                '<div class="domain-cookie-modal-footer">' +
                    '<button class="domain-cookie-modal-btn domain-cookie-modal-btn-reject" onclick="window.DomainCookies.rejectAll()">Reject All</button>' +
                    '<button class="domain-cookie-modal-btn domain-cookie-modal-btn-save" onclick="window.DomainCookies.saveSettings()">Save Settings</button>' +
                    '<button class="domain-cookie-modal-btn domain-cookie-modal-btn-accept" onclick="window.DomainCookies.acceptAll()">Accept All</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(this.modal);

        // Close modal when clicking outside
        this.modal.addEventListener('click', function(e) {
            if (e.target === self.modal) {
                self.hideSettings();
            }
        });
        
    };

    DomainCookieManager.prototype.createCookieCategories = function() {
        var categories = [
            {
                id: 'necessary',
                title: 'Necessary Cookies',
                description: 'Essential for website functionality',
                details: 'These cookies are required for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
                icon: '🛡️',
                required: true,
                className: 'essential'
            },
            {
                id: 'analytics',
                title: 'Analytics Cookies',
                description: 'Help us understand website performance',
                details: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
                icon: '📊',
                required: false,
                className: 'analytics'
            },
            {
                id: 'functional',
                title: 'Functional Cookies',
                description: 'Remember your preferences and settings',
                details: 'These cookies enable enhanced functionality such as remembering your preferences and customization options.',
                icon: '⚙️',
                required: false,
                className: 'functional'
            },
            {
                id: 'marketing',
                title: 'Marketing Cookies',
                description: 'Show relevant advertisements and content',
                details: 'These cookies are used to deliver more relevant advertising and measure the effectiveness of marketing campaigns.',
                icon: '🎯',
                required: false,
                className: 'marketing'
            }
        ];

        var html = '';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var isActive = cookiePreferences[cat.id] ? 'active' : '';
            var toggleClick = cat.required ? '' : 'onclick="window.DomainCookies.toggleCategory(\'' + cat.id + '\')"';
            var disabledClass = cat.required ? 'disabled' : '';
            
            html += 
                '<div class="domain-cookie-category ' + cat.className + '">' +
                    '<div class="domain-cookie-category-header">' +
                        '<div class="domain-cookie-category-info">' +
                            '<div class="domain-cookie-category-icon ' + cat.className + '">' + cat.icon + '</div>' +
                            '<div>' +
                                '<h3 class="domain-cookie-category-title">' + cat.title + '</h3>' +
                                '<p class="domain-cookie-category-desc">' + cat.description + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="domain-cookie-toggle ' + disabledClass + ' ' + isActive + '" data-category="' + cat.id + '" ' + toggleClick + '>' +
                            '<div class="domain-cookie-toggle-slider"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="domain-cookie-category-details">' +
                        cat.details +
                        (cat.required ? '<br><strong>Status:</strong> Always Active' : '') +
                    '</div>' +
                '</div>';
        }
        
        return html;
    };

    DomainCookieManager.prototype.showBanner = function() {
        if (this.banner && !this.hasConsent()) {
            this.banner.classList.add('show');
        }
    };

    DomainCookieManager.prototype.hideBanner = function() {
        if (this.banner) {
            this.banner.classList.remove('show');
        }
    };

    DomainCookieManager.prototype.showSettings = function() {
        if (this.modal) {
            this.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        this.hideBanner();
    };

    DomainCookieManager.prototype.hideSettings = function() {
        if (this.modal) {
            this.modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        // Show banner again if user closes modal without making a choice
        if (!this.hasConsent()) {
            var self = this;
            setTimeout(function() {
                self.showBanner();
            }, 500);
        }
    };

    DomainCookieManager.prototype.toggleCategory = function(category) {
        if (category === 'necessary') return;
        
        cookiePreferences[category] = !cookiePreferences[category];
        this.updateToggleUI(category);
    };

    DomainCookieManager.prototype.updateToggleUI = function(category) {
        var toggle = document.querySelector('[data-category="' + category + '"]');
        if (toggle) {
            if (cookiePreferences[category]) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        }
    };

    DomainCookieManager.prototype.acceptAll = function() {
        cookiePreferences = {
            necessary: true,
            analytics: true,
            functional: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        this.savePreferences();
        this.hideBanner();
        this.hideSettings();
        Utils.showToast('All cookies accepted! 🍪', 'success');
    };

    DomainCookieManager.prototype.rejectAll = function() {
        cookiePreferences = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        this.savePreferences();
        this.hideBanner();
        this.hideSettings();
        Utils.showToast('Cookie preferences updated', 'warning');
    };

    DomainCookieManager.prototype.saveSettings = function() {
        cookiePreferences.timestamp = new Date().toISOString();
        this.savePreferences();
        this.hideSettings();
        Utils.showToast('Cookie preferences saved! ✅', 'success');
    };

    DomainCookieManager.prototype.savePreferences = function() {
        Utils.setCookie(CONFIG.cookieName, JSON.stringify(cookiePreferences), CONFIG.cookieExpiry);
    };

    DomainCookieManager.prototype.loadPreferences = function() {
        var saved = Utils.getCookie(CONFIG.cookieName);
        if (saved) {
            try {
                var parsed = JSON.parse(saved);
                cookiePreferences = Object.assign(cookiePreferences, parsed);
            } catch (e) {
                // Silently fail and use defaults
            }
        }
    };

    DomainCookieManager.prototype.hasConsent = function() {
        return Utils.getCookie(CONFIG.cookieName) !== null;
    };

    DomainCookieManager.prototype.getPreferences = function() {
        return Object.assign({}, cookiePreferences);
    };

    DomainCookieManager.prototype.reset = function() {
        Utils.setCookie(CONFIG.cookieName, '', -1);
        cookiePreferences = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false,
            timestamp: null
        };
        location.reload();
    };

    // Initialize when DOM is ready
    function initCookieManager() {
        if (typeof window.DomainCookies === 'undefined') {
            window.DomainCookies = new DomainCookieManager();
        }
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieManager);
    } else {
        initCookieManager();
    }

})();
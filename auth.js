// Authentication functionality
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('symptocare_users') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('symptocare_current_user') || 'null');
        this.initializeAuth();
    }

    initializeAuth() {
        // Initialize form event listeners
        this.initializeLoginForm();
        this.initializeRegisterForm();
        this.initializeForgotPasswordForm();
        this.initializePasswordStrength();
        
        // Check if user is already logged in
        if (this.currentUser) {
            this.updateNavigation();
        }
    }

    initializeLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    initializeRegisterForm() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    initializeForgotPasswordForm() {
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }
    }

    initializePasswordStrength() {
        const passwordInput = document.getElementById('registerPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showError('loginEmailError', 'Please enter a valid email address');
            return;
        }
        
        if (!password) {
            this.showError('loginPasswordError', 'Password is required');
            return;
        }
        
        // Show loading state
        this.setButtonLoading('loginBtn', true);
        
        try {
            // Simulate API call delay
            await this.delay(1500);
            
            // Check credentials
            const user = this.users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Successful login
                this.currentUser = { ...user };
                delete this.currentUser.password; // Don't store password in current user
                
                // Store user session
                localStorage.setItem('symptocare_current_user', JSON.stringify(this.currentUser));
                
                if (rememberMe) {
                    localStorage.setItem('symptocare_remember_user', email);
                }
                
                // Update last login
                const userIndex = this.users.findIndex(u => u.email === email);
                this.users[userIndex].lastLogin = new Date().toISOString();
                localStorage.setItem('symptocare_users', JSON.stringify(this.users));
                
                // Show success and redirect
                this.showSuccessModal('Welcome Back!', `Hello ${user.firstName}, you've successfully signed in.`);
                
            } else {
                this.showError('loginPasswordError', 'Invalid email or password');
            }
            
        } catch (error) {
            this.showError('loginPasswordError', 'Login failed. Please try again.');
        } finally {
            this.setButtonLoading('loginBtn', false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            gender: document.getElementById('gender').value,
            agreeTerms: document.getElementById('agreeTerms').checked,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate form
        if (!this.validateRegistrationForm(formData)) {
            return;
        }
        
        // Show loading state
        this.setButtonLoading('registerBtn', true);
        
        try {
            // Simulate API call delay
            await this.delay(2000);
            
            // Check if user already exists
            if (this.users.find(u => u.email === formData.email)) {
                this.showError('registerEmailError', 'An account with this email already exists');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password, // In real app, this would be hashed
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                newsletter: formData.newsletter,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                profile: {
                    healthHistory: [],
                    preferences: {},
                    remedyHistory: []
                }
            };
            
            // Add to users array
            this.users.push(newUser);
            localStorage.setItem('symptocare_users', JSON.stringify(this.users));
            
            // Set as current user
            this.currentUser = { ...newUser };
            delete this.currentUser.password;
            localStorage.setItem('symptocare_current_user', JSON.stringify(this.currentUser));
            
            // Show success modal
            this.showSuccessModal('Account Created!', `Welcome to SymptoCare, ${newUser.firstName}! Your account has been created successfully.`);
            
        } catch (error) {
            this.showError('registerEmailError', 'Registration failed. Please try again.');
        } finally {
            this.setButtonLoading('registerBtn', false);
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value;
        
        // Clear previous errors
        this.clearErrors();
        
        if (!this.validateEmail(email)) {
            this.showError('forgotEmailError', 'Please enter a valid email address');
            return;
        }
        
        // Show loading state
        this.setButtonLoading('forgotBtn', true);
        
        try {
            // Simulate API call delay
            await this.delay(1500);
            
            // Check if user exists
            const user = this.users.find(u => u.email === email);
            
            if (user) {
                // In a real app, this would send an email
                this.showSuccessModal('Reset Link Sent!', `A password reset link has been sent to ${email}. Please check your inbox.`);
            } else {
                // For security, we don't reveal if email exists or not
                this.showSuccessModal('Reset Link Sent!', `If an account with ${email} exists, a password reset link has been sent.`);
            }
            
        } catch (error) {
            this.showError('forgotEmailError', 'Failed to send reset link. Please try again.');
        } finally {
            this.setButtonLoading('forgotBtn', false);
        }
    }

    validateRegistrationForm(data) {
        let isValid = true;
        
        // First name validation
        if (!data.firstName.trim()) {
            this.showError('firstNameError', 'First name is required');
            isValid = false;
        }
        
        // Last name validation
        if (!data.lastName.trim()) {
            this.showError('lastNameError', 'Last name is required');
            isValid = false;
        }
        
        // Email validation
        if (!this.validateEmail(data.email)) {
            this.showError('registerEmailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        const passwordStrength = this.getPasswordStrength(data.password);
        if (passwordStrength.score < 2) {
            this.showError('registerPasswordError', 'Password is too weak. Please choose a stronger password.');
            isValid = false;
        }
        
        // Confirm password validation
        if (data.password !== data.confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        // Date of birth validation
        if (!data.dateOfBirth) {
            this.showError('dateOfBirthError', 'Date of birth is required');
            isValid = false;
        } else {
            const birthDate = new Date(data.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 13) {
                this.showError('dateOfBirthError', 'You must be at least 13 years old to create an account');
                isValid = false;
            }
        }
        
        // Gender validation
        if (!data.gender) {
            this.showError('genderError', 'Please select your gender');
            isValid = false;
        }
        
        // Terms agreement validation
        if (!data.agreeTerms) {
            this.showError('agreeTermsError', 'You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    checkPasswordStrength(password) {
        const strength = this.getPasswordStrength(password);
        const strengthElement = document.getElementById('passwordStrength');
        
        if (strengthElement) {
            strengthElement.className = 'password-strength';
            
            if (password.length === 0) {
                strengthElement.textContent = '';
                return;
            }
            
            switch (strength.score) {
                case 0:
                case 1:
                    strengthElement.classList.add('strength-weak');
                    strengthElement.textContent = 'Weak password';
                    break;
                case 2:
                    strengthElement.classList.add('strength-medium');
                    strengthElement.textContent = 'Medium strength';
                    break;
                case 3:
                case 4:
                    strengthElement.classList.add('strength-strong');
                    strengthElement.textContent = 'Strong password';
                    break;
            }
        }
    }

    getPasswordStrength(password) {
        let score = 0;
        const feedback = [];
        
        // Length check
        if (password.length >= 8) score++;
        else feedback.push('Use at least 8 characters');
        
        // Lowercase check
        if (/[a-z]/.test(password)) score++;
        else feedback.push('Add lowercase letters');
        
        // Uppercase check
        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Add uppercase letters');
        
        // Number check
        if (/\d/.test(password)) score++;
        else feedback.push('Add numbers');
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) score++;
        else feedback.push('Add special characters');
        
        return { score: Math.min(score, 4), feedback };
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            
            // Add error class to form group
            const formGroup = errorElement.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
            }
        }
    }

    clearErrors() {
        document.querySelectorAll('.input-error').forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
        });
    }

    setButtonLoading(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (button) {
            if (loading) {
                button.classList.add('loading');
                button.disabled = true;
                const loadingElement = button.querySelector('.btn-loading');
                if (loadingElement) {
                    loadingElement.style.display = 'block';
                }
            } else {
                button.classList.remove('loading');
                button.disabled = false;
                const loadingElement = button.querySelector('.btn-loading');
                if (loadingElement) {
                    loadingElement.style.display = 'none';
                }
            }
        }
    }

    showSuccessModal(title, message) {
        const modal = document.getElementById('successModal');
        const titleElement = document.getElementById('successTitle');
        const messageElement = document.getElementById('successMessage');
        
        if (modal && titleElement && messageElement) {
            titleElement.textContent = title;
            messageElement.textContent = message;
            modal.style.display = 'flex';
        }
    }

    updateNavigation() {
        // Update navigation to show user is logged in
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && this.currentUser) {
            // Add user menu or update login link
            const loginLink = navMenu.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.textContent = `Hello, ${this.currentUser.firstName}`;
                loginLink.href = '#';
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showUserMenu();
                });
            }
        }
    }

    showUserMenu() {
        // Create and show user dropdown menu
        console.log('Show user menu for:', this.currentUser);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('symptocare_current_user');
        localStorage.removeItem('symptocare_remember_user');
        window.location.href = 'index.html';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global functions for HTML onclick handlers
function switchAuthTab(tabName) {
    // Hide all form containers
    document.querySelectorAll('.auth-form-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected form
    const selectedForm = document.getElementById(`${tabName}-form`);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Clear any existing errors
    if (window.authManager) {
        window.authManager.clearErrors();
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showForgotPassword() {
    document.querySelectorAll('.auth-form-container').forEach(container => {
        container.classList.remove('active');
    });
    
    document.getElementById('forgot-password-form').classList.add('active');
}

function hideForgotPassword() {
    document.getElementById('forgot-password-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

function socialLogin(provider) {
    // Simulate social login
    console.log(`Social login with ${provider}`);
    alert(`Social login with ${provider} is not implemented in this demo.`);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Redirect to dashboard or home page
    window.location.href = 'index.html';
}

function showTerms() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function showPrivacy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Handle escape key for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Pre-fill email if remembered
    const rememberedEmail = localStorage.getItem('symptocare_remember_user');
    if (rememberedEmail) {
        const loginEmail = document.getElementById('loginEmail');
        if (loginEmail) {
            loginEmail.value = rememberedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
});

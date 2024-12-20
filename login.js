document.getElementById('login-form').addEventListener('submit', (event) => {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();
	const password = document.getElementById('password').value.trim();

	if (username === 'admin' && password === 'admin') {
		localStorage.setItem('loggedIn', 'true');

		window.location.href = 'index.html';
	} else {
		showErrorMessage('Invalid username or password');
	}
});

function showErrorMessage(message) {
	const existingError = document.querySelector('.error-message');
	if (existingError) {
		existingError.remove();
	}

	const errorDiv = document.createElement('div');
	errorDiv.classList.add('error-message', 'alert', 'alert-danger', 'mt-3');
	errorDiv.textContent = message;

	const loginForm = document.getElementById('login-form');
	loginForm.appendChild(errorDiv);

	loginForm.classList.add('shake-animation');

	setTimeout(() => {
		loginForm.classList.remove('shake-animation');
	}, 500);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .error-message {
        text-align: center;
        margin-top: 15px;
        animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .shake-animation {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
`;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
	const passwordInput = document.getElementById('password');
	const togglePassword = document.createElement('button');

	togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
	togglePassword.classList.add('password-toggle');
	togglePassword.type = 'button';

	const styleElement = document.createElement('style');
	styleElement.textContent = `
        .password-toggle {
            position: absolute;
            right: 10px;
            top: 70%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #6c757d;
        }
    `;
	document.head.appendChild(styleElement);

	const passwordContainer = passwordInput.parentElement;
	passwordContainer.style.position = 'relative';
	passwordContainer.appendChild(togglePassword);

	togglePassword.addEventListener('click', () => {
		const type = passwordInput.type === 'password' ? 'text' : 'password';
		passwordInput.type = type;

		togglePassword.innerHTML =
			type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
	});
});

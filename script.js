// =========================
// DARK MODE TOGGLE
// =========================
const toggleBtn = document.getElementById("dark-mode-toggle");

if (toggleBtn) {
    const toggleIcon = toggleBtn.querySelector("i");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleIcon.classList.remove("fa-moon");
            toggleIcon.classList.add("fa-sun");
        } else {
            toggleIcon.classList.remove("fa-sun");
            toggleIcon.classList.add("fa-moon");
        }
    });
}

// =========================
// FORM VALIDATION
// =========================
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama    = document.getElementById("nama");
        const email   = document.getElementById("email");
        const telepon = document.getElementById("telepon");
        const subjek  = document.getElementById("subjek");
        const pesan   = document.getElementById("pesan");

        let valid = true;

        // Helper: tampilkan / hapus pesan error
        function showError(input, message) {
            clearError(input);
            input.classList.add("input-error");
            const span = document.createElement("span");
            span.className = "error-msg";
            span.textContent = message;
            input.parentNode.insertBefore(span, input.nextSibling);
            valid = false;
        }

        function clearError(input) {
            input.classList.remove("input-error");
            const next = input.nextSibling;
            if (next && next.className === "error-msg") next.remove();
        }

        // Reset semua error dulu
        [nama, email, telepon, subjek, pesan].forEach(clearError);

        // Validasi Nama
        if (nama.value.trim() === "") {
            showError(nama, "Nama lengkap wajib diisi.");
        }

        // Validasi Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            showError(email, "Email wajib diisi.");
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, "Format email tidak valid.");
        }

        // Validasi Nomor HP (opsional, tapi jika diisi harus valid)
        const teleponRegex = /^[0-9+\-\s]{7,15}$/;
        if (telepon.value.trim() !== "" && !teleponRegex.test(telepon.value.trim())) {
            showError(telepon, "Format nomor HP tidak valid.");
        }

        // Validasi Subjek
        if (subjek.value.trim() === "") {
            showError(subjek, "Subjek wajib diisi.");
        }

        // Validasi Pesan
        if (pesan.value.trim() === "") {
            showError(pesan, "Pesan wajib diisi.");
        } else if (pesan.value.trim().length < 10) {
            showError(pesan, "Pesan minimal 10 karakter.");
        }

        // Jika semua valid, tampilkan sukses
        if (valid) {
            const successMsg = document.getElementById("form-success");
            if (successMsg) {
                successMsg.style.display = "block";
                contactForm.reset();
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 4000);
            }
        }
    });

    // Hapus error saat user mulai mengetik ulang
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("input", function () {
            this.classList.remove("input-error");
            const next = this.nextSibling;
            if (next && next.className === "error-msg") next.remove();
        });
    });
}

// =========================
// ACTIVE NAV ON SCROLL
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
